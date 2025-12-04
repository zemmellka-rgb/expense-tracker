// api/expenses.js

let expenses = [
  { id: 1, description: "Coffee", amount: 3.5 },
  { id: 2, description: "Groceries", amount: 25.0 }
];

export default function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json(expenses);
  }

  if (req.method === "POST") {
    const { description, amount } = req.body; // ✅ Already parsed by Vercel

    if (!description || !amount) {
      return res.status(400).json({ error: "description and amount required" });
    }

    const newExpense = {
      id: expenses.length + 1,
      description,
      amount: Number(amount)
    };

    expenses.push(newExpense);

    return res.status(201).json(newExpense);
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
