import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";

export const loadArticles = async() => {

    const collectionRef = collection(FirebaseDB, `/articles` );
    const docs =  await getDocs(collectionRef);

    const articles = [];
    docs.forEach( doc => {
        articles.push({ id: doc.id, ...doc.data() });
    });

    return articles;

}