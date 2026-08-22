// 1. FIREBASE CONFIGURATION 
const firebaseConfig = {
    apiKey: "YOUR_API_KEY_HERE",
    authDomain: "YOUR_AUTH_DOMAIN_HERE",
    projectId: "YOUR_PROJECT_ID_HERE",
    storageBucket: "YOUR_STORAGE_BUCKET_HERE",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID_HERE",
    appId: "YOUR_APP_ID_HERE"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// 2. MAP CONFIGURATION (High Visibility) 
const mapStyle = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
const mapAttrib = '©OpenStreetMap, ©CartoDB';


function speak(text) {
    const synth = window.speechSynthesis;
    if (synth.speaking) synth.cancel();
    synth.speak(new SpeechSynthesisUtterance(text));
}
function playSiren() {
    const siren = new Audio('https://actions.google.com/sounds/v1/emergency/ambulance_siren.ogg');
    siren.volume = 0.5;
    siren.play().catch(e => console.log("Click page to enable audio"));
}
async function loginDriver(id, pin) {
    try {
        const doc = await db.collection("authorized_drivers").doc(id.toUpperCase()).get();
        if (doc.exists && doc.data().pin === pin) {
            return { success: true };
        }
        return { success: false };
    } catch (e) {
        console.error(e);
        return { success: false };
    }
}

const initialInventory = {
    oxygen: "Full",
    bandages: 10,
    iv_kits: 5,
    defib: "Functional"
};


async function syncInventory(id, data) {
    try {
        await db.collection("ambulances").doc(id).set({
            inventory: data,
            lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
    } catch (e) { console.error("Inventory Sync Error:", e); }
}

// Haversine Formula
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c; // Distance in km
}

// Priority Score
function calculatePriorityScore(distance, isEmergency, invLevel) {
    const avgSpeed = 40; // km/h
    const eta = (distance / avgSpeed) * 60; // Minutes
    
    const w1 = 0.5, w2 = 0.3, w3 = 0.2;
    const s_val = isEmergency ? 0 : 1; // 1 if available
    const inv_val = invLevel === 'Full' ? 1.0 : 0.4;
    
    
    return (w1 * (1 / (eta + 1))) + (w2 * s_val) + (w3 * inv_val);
}