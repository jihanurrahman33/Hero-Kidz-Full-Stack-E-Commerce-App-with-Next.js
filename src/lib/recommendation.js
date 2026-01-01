
// Minimal list of English stop words
const STOP_WORDS = new Set([
  "a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are", "aren't", "as", "at", "be", "because", "been", "before", "being", "below", "between", "both", "but", "by", "can't", "cannot", "could", "couldn't", "did", "didn't", "do", "does", "doesn't", "doing", "don't", "down", "during", "each", "few", "for", "from", "further", "had", "hadn't", "has", "hasn't", "have", "haven't", "having", "he", "he'd", "he'll", "he's", "her", "here", "here's", "hers", "herself", "him", "himself", "his", "how", "how's", "i", "i'd", "i'll", "i'm", "i've", "if", "in", "into", "is", "isn't", "it", "it's", "its", "itself", "let's", "me", "more", "most", "mustn't", "my", "myself", "no", "nor", "not", "of", "off", "on", "once", "only", "or", "other", "ought", "our", "ours", "ourselves", "out", "over", "own", "same", "shan't", "she", "she'd", "she'll", "she's", "should", "shouldn't", "so", "some", "such", "than", "that", "that's", "the", "their", "theirs", "them", "themselves", "then", "there", "there's", "these", "they", "they'd", "they'll", "they're", "they've", "this", "those", "through", "to", "too", "under", "until", "up", "very", "was", "wasn't", "we", "we'd", "we'll", "we're", "we've", "were", "weren't", "what", "what's", "when", "when's", "where", "where's", "which", "while", "who", "who's", "whom", "why", "why's", "with", "won't", "would", "wouldn't", "you", "you'd", "you'll", "you're", "you've", "your", "yours", "yourself", "yourselves"
]);

function tokenize(text) {
  if (!text) return [];
  return text.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Remove special chars but keep hyphens for some words
    .split(/\s+/)
    .filter(word => word.length > 2 && !STOP_WORDS.has(word));
}

// TF-IDF Implementation
class TfidfVectorizer {
    constructor() {
        this.vocabulary = {};
        this.idf = {};
    }

    fit_transform(documents) {
        // 1. Build Vocabulary and Doc Frequencies
        const docCounts = {}; // word -> set of doc indices
        const tfVectors = documents.map((doc, docIndex) => {
            const tokens = tokenize(doc);
            const tf = {};
            tokens.forEach(token => {
                tf[token] = (tf[token] || 0) + 1;
                if (!docCounts[token]) docCounts[token] = new Set();
                docCounts[token].add(docIndex);
            });
            return tf;
        });

        const N = documents.length;
        const vectors = [];

        // 2. Calculate IDF and generate vectors
        tfVectors.forEach(tf => {
            const vector = {};
            for (const term in tf) {
                // IDF formula: log(N / (1 + df)) + 1 (Standard sklearn smooth_idf=True equivalent logic roughly)
                // Using standard log10 or ln
                const df = docCounts[term].size;
                const idf = Math.log((1 + N) / (1 + df)) + 1; 
                this.idf[term] = idf;
                vector[term] = tf[term] * idf;
            }
            vectors.push(vector);
        });

        // 3. Normalize vectors (L2 Norm) - Important for Cosine Similarity
        return vectors.map(vec => {
            let magnitude = 0;
            for (const val of Object.values(vec)) magnitude += val * val;
            magnitude = Math.sqrt(magnitude);

            const normalized = {};
            if (magnitude > 0) {
                for (const term in vec) normalized[term] = vec[term] / magnitude;
            }
            return normalized;
        });
    }

    // Just transform a single new document based on existing vocabulary/IDF (not really needed for this specific offline-style batch, but good practice structure)
    // Actually for this specific use case, we re-fit on the whole set including the target to be dynamic. 
}

function cosineSimilarity(vecA, vecB) {
    let dotProduct = 0;
    // Iterate over smaller vector for efficiency
    const termsA = Object.keys(vecA);
    const termsB = Object.keys(vecB);
    
    // Choose the vector with fewer keys to iterate
    const [smaller, larger] = termsA.length < termsB.length ? [vecA, vecB] : [vecB, vecA];

    for (const term in smaller) {
        if (larger[term]) {
            dotProduct += smaller[term] * larger[term];
        }
    }
    return dotProduct;
}

// Business Rules
function ageOverlapScore(age1, age2) {
    try {
        if (!age1 || !age2) return 0.85;
        const [a1_min, a1_max] = age1.split("-").map(s => parseInt(s.trim()));
        const [a2_min, a2_max] = age2.split("-").map(s => parseInt(s.trim()));

        if (isNaN(a1_min) || isNaN(a2_min)) return 0.85; // Fallback for bad format

        const overlap_min = Math.max(a1_min, a2_min);
        const overlap_max = Math.min(a1_max || a1_min, a2_max || a2_min); // Handle single numbers if range is missing

        if (overlap_min <= overlap_max) {
            return 1.15;   // BOOST if overlap
        }
        return 0.85;       // PENALTY if no overlap
    } catch (e) {
        return 0.85;
    }
}

function categoryBoost(viewed_cat, candidate_cat) {
    if (!viewed_cat || !candidate_cat) return 1.0;

    // Exact same category → strong boost
    if (viewed_cat === candidate_cat) {
        return 1.25;
    }

    // Related learning categories
    const learning_related = new Set([
        "Educational Toy",
        "STEM Toy",
        "Logic Game",
        "Flash Cards",
        "Creative Learning"
    ]);

    if (learning_related.has(viewed_cat) && learning_related.has(candidate_cat)) {
        return 1.15;
    }

    // Penalize costumes when viewing learning products
    if (candidate_cat === "Costume") {
        return 0.60;
    }

    // Neutral
    return 1.0;
}

export function getRecommendations(targetProduct, allProducts, topN = 4) {
    if (!targetProduct || !allProducts || allProducts.length === 0) return [];

    const documents = allProducts.map(p => p.recommendationText || p.title + " " + (p.description || ""));
    
    const vectorizer = new TfidfVectorizer();
    const tfidfVectors = vectorizer.fit_transform(documents);

    // Find index of target product in the list
    // Note: We assume targetProduct is IN allProducts. If not, we should optimize logic, but here we'll assume we passed the full DB list including it.
    // Ideally we pass the full list and find by ID.
    const targetIdx = allProducts.findIndex(p => p._id.toString() === targetProduct._id.toString());
    
    if (targetIdx === -1) return []; // Should not happen if correctly passed

    const targetVector = tfidfVectors[targetIdx];
    const results = [];

    tfidfVectors.forEach((vec, idx) => {
        if (idx === targetIdx) return;

        const candidate = allProducts[idx];
        const baseScore = cosineSimilarity(targetVector, vec);

        const ageFactor = ageOverlapScore(targetProduct.ageRange, candidate.ageRange);
        const catFactor = categoryBoost(targetProduct.category, candidate.category);

        const finalScore = baseScore * ageFactor * catFactor;

        results.push({
            ...candidate,
            final_score: finalScore
        });
    });

    // Sort descending
    results.sort((a, b) => b.final_score - a.final_score);

    return results.slice(0, topN);
}
