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
    try {
      const { description, amount } = JSON.parse(req.body);

      if (!description || !amount) {
        return res.status(400).json({ error: "description and amount required" });
      }

      const newExpense = {
        id: expenses.length + 1,
        description,
        amount
      };

      expenses.push(newExpense);
      return res.status(201).json(newExpense);
    } catch (err) {
      return res.status(400).json({ error: "Invalid JSON" });
    }
  }

  // Other HTTP methods not allowed
  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
