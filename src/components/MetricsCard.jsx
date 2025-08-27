import { Card, CardContent } from "./ui/Card";

export default function MetricsCard({ title, value }) {
  return (
    <Card className="shadow-lg rounded-2xl">
      <CardContent className="p-6 text-center">
        <p className="text-gray-500 text-sm">{title}</p>
        <h2 className="text-xl font-semibold mt-2">{value}</h2>
      </CardContent>
    </Card>
  );
}