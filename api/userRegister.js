import { db } from "../firebase/index";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  Timestamp,
  query,
  onSnapshot,
  where,
} from "firebase/firestore";

export const getBPs = (user, setBPs) => {
  try {
    if (!user) {
      setBPs([]);
      return;
    }

    const q = query(collection(db, "bp"), where("user", "==", user.uid));

    onSnapshot(q, (querySnapshot) => {
      let ar = [];
      querySnapshot.docs.forEach((doc) => {
        ar.push({ id: doc.id, ...doc.data() });
      });
      ar.sort((a, b) => b.createdAt - a.createdAt);
      setBPs(ar);
    });
  } catch (err) {
    console.log(err);
  }
};

export const addUsers = async ({ firstName, lastName, hn, tel, gender }) => {
  try {
    await addDoc(collection(db, "users"), {
        firstname : firstName,
        lastname : lastName,
        hn : hn,
        tel : tel,
        gender : gender
    });
  } catch (err) {
    console.log(err);
  }
};

export const editBP = async ({ docId, sys, dia, pulse, changeAt }) => {
  try {
    const BPRef = doc(db, "bp", docId);

    await updateDoc(BPRef, {
      sys,
      dia,
      pulse,
      changeAt: Timestamp.now(),
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteBP = async (docId) => {
  try {
    const BPRef = doc(db, "bp", docId);
    await deleteDoc(BPRef);
  } catch (err) {
    console.log(err);
  }
};

export const getBPChart = (user) => {
  if (!user) {
    return;
  }

  const q = query(collection(db, "bp"), where("user", "==", user.uid));

  onSnapshot(q, (querySnapshot) => {
    const ar = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    const sortedBPs = ar.sort((a, b) => a.createdAt - b.createdAt);

    const labels = sortedBPs.map((bp) =>
      bp.createdAt.toDate().toLocaleString()
    );
    const datasets = [
      {
        label: "SYS",
        data: sortedBPs.map((bp) => bp.sys),
        borderColor: "red",
        fill: false,
      },
      {
        label: "DIA",
        data: sortedBPs.map((bp) => bp.dia),
        borderColor: "blue",
        fill: false,
      },
      {
        label: "PUL",
        data: sortedBPs.map((bp) => bp.pul),
        borderColor: "green",
        fill: false,
      },
    ];

    const ctx = document.getElementById("myChart");

    const existingChart = Chart.getChart(ctx);
    if (existingChart) {
      existingChart.destroy();
    }

    new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: datasets,
      },
    });
  });
};

export const addBP = async ({ sys, dia, pulse }) => {
  try {
    await addDoc(collection(db, "bp"), {
      sys: sys,
      dia: dia,
      pulse: pulse,
      createdAt: Timestamp.now(),
      changeAt: Timestamp.now(),
    });
  } catch (err) {
    console.log(err);
  }
};