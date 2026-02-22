// import { db } from "./JS/db";

// export const seedDatabase = async () => {
//   const count = await db.hospitals.count();

//   if (count === 0) {
//     console.log("Seeding dummy hospital data...");
//     await db.hospitals.bulkAdd([
//       {
//         name: "LUTH (Lagos University Teaching Hospital)",
//         lga: "Idi-Araba",
//         antiVenom: true,
//         blood: true,
//         phone: "08033025000",
//         ambulance: "112",
//         insuranceHelp: "NHIS, Free Maternal Care",
//       },
//       {
//         name: "Gbagada General Hospital",
//         lga: "Kosofe",
//         antiVenom: false,
//         blood: true,
//         phone: "08023124455",
//         ambulance: "767",
//         insuranceHelp: "State Health Scheme (LASHMA)",
//       },
//       {
//         name: "Ikeja Medical Centre",
//         lga: "Ikeja",
//         antiVenom: true,
//         blood: false,
//         phone: "01-2705550",
//         ambulance: "911",
//         insuranceHelp: "Red Cross Emergency Fund",
//       },
//       {
//         name: "Federal Medical Centre",
//         lga: "Ebute Metta",
//         antiVenom: false,
//         blood: false,
//         phone: "08033344455",
//         ambulance: "112",
//         insuranceHelp: "NGO Assisted: Wellbeing Foundation",
//       },
//       {
//         name: "Surulere General Hospital",
//         lga: "Surulere",
//         antiVenom: true,
//         blood: true,
//         phone: "08055566677",
//         ambulance: "767",
//         insuranceHelp: "Lagos State Equity Fund",
//       },
//     ]);
//     console.log("Database seeded successfully!");
//   }
// };

// seed.js
import { db } from "./JS/db";

export const seedDatabase = async () => {
  console.log("Seeding database with sample hospitals...");

  const hospitals = [
    {
      name: "Lagos University Teaching Hospital",
      lga: "Ikeja",
      address: "Idi Araba, Mushin",
      phone: "+234-1-1234567",
      lastUpdated: Date.now(),
    },
    {
      name: "General Hospital Lagos",
      lga: "Lagos Island",
      address: "Broad Street, Lagos Island",
      phone: "+234-1-7654321",
      lastUpdated: Date.now(),
    },
    {
      name: "Gbagada General Hospital",
      lga: "Gbagada",
      address: "Gbagada Phase 2",
      phone: "+234-1-9876543",
      lastUpdated: Date.now(),
    },
    {
      name: "Isolo General Hospital",
      lga: "Isolo",
      address: "Isolo",
      phone: "+234-1-5432109",
      lastUpdated: Date.now(),
    },
  ];

  // Add hospitals
  for (const hospital of hospitals) {
    const id = await db.hospitals.add(hospital);

    // Add resources for each hospital
    await db.resources.bulkAdd([
      {
        hospitalId: id,
        type: "blood",
        bloodType: "A+",
        quantity: Math.floor(Math.random() * 10),
        criticalLevel: 3,
        updatedAt: Date.now(),
      },
      {
        hospitalId: id,
        type: "blood",
        bloodType: "B+",
        quantity: Math.floor(Math.random() * 8),
        criticalLevel: 3,
        updatedAt: Date.now(),
      },
      {
        hospitalId: id,
        type: "blood",
        bloodType: "O+",
        quantity: Math.floor(Math.random() * 12),
        criticalLevel: 3,
        updatedAt: Date.now(),
      },
      {
        hospitalId: id,
        type: "blood",
        bloodType: "AB+",
        quantity: Math.floor(Math.random() * 5),
        criticalLevel: 2,
        updatedAt: Date.now(),
      },
      {
        hospitalId: id,
        type: "icu",
        quantity: Math.floor(Math.random() * 10),
        total: 10,
        updatedAt: Date.now(),
      },
      {
        hospitalId: id,
        type: "antivenom",
        available: Math.random() > 0.5,
        types: ["Snake", "Spider"],
        updatedAt: Date.now(),
      },
    ]);
  }

  console.log("Database seeded successfully");
};
