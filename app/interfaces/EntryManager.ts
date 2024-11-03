import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { formatDate, JournalEntry } from "../app/DailyJournal";
import { SummaryData } from "@/app/app/SummaryDisplay";

export class EntryManager {
  userId: string;

  constructor(userId: string) {
    this.userId = userId;
  }

  async getEntry(formattedDate: string) {
    const dataDoc = doc(db, this.userId, formattedDate);
    const dataSnap = await getDoc(dataDoc);

    if (dataSnap.exists()) {
      return dataSnap.data() as JournalEntry;
    } else {
      return null;
    }
  }

  async setEntry(data: JournalEntry) {
    const formattedDate = formatDate(new Date(data.date));
    await setDoc(doc(collection(db, this.userId), formattedDate), data);
  }
}
