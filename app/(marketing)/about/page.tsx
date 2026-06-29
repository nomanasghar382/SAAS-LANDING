export const metadata = {
  title: "About",
};

const values = [
  {
    title: "Customer obsession",
    description:
      "We build every feature with our customers' success in mind. Your wins are our wins.",
  },
  {
    title: "Innovation first",
    description:
      "We leverage cutting-edge AI to solve real sales challenges, not just add buzzwords.",
  },
  {
    title: "Transparency",
    description:
      "Clear pricing, honest communication, and no hidden fees. Ever.",
  },
];

export default function AboutPage() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight">
            Building the future of sales
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            SellPilot AI was founded with a simple mission: help sales teams
            close more deals by automating the repetitive work and surfacing
            the insights that matter most.
          </p>
          <p className="mt-4 text-lg text-muted-foreground">
            Our team combines decades of experience in enterprise sales,
            machine learning, and SaaS product development. We&apos;re backed by
            leading investors and trusted by thousands of sales professionals
            worldwide.
          </p>
        </div>

        <div className="mt-20">
          <h2 className="text-2xl font-bold">Our values</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {values.map((value) => (
              <div key={value.title} className="rounded-xl border p-6">
                <h3 className="font-semibold">{value.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
