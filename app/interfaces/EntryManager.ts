import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { formatDate, JournalEntry } from "../app/DailyJournal";

export class EntryManager {
  userId: string;

  constructor(userId: string) {
    this.userId = userId;
  }

  async getEntry(formattedDate: string) {
    const dataDoc = doc(db, this.userId, formattedDate);
    const dataSnap = await getDoc(dataDoc);

    return dataSnap.data() as JournalEntry;
  }

  async setEntry(data: JournalEntry) {
    const dataDoc = doc(db, this.userId, formatDate(new Date(data.date)));
    const dataSnap = await setDoc(dataDoc, data);
  }
}
