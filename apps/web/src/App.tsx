import { useEffect, useState } from 'react';
import {
  HealthResponseSchema,
  type HealthResponse,
} from '@repo/contracts/health';
import { Button } from '@repo/ui/components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';

const activityItems = Array.from({ length: 12 }, (_, index) => ({
  id: index + 1,
  label: `Activity item ${index + 1}`,
}));

export function App() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function fetchHealth() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/health');
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data: unknown = await response.json();
      setHealth(HealthResponseSchema.parse(data));
    } catch (err) {
      setHealth(null);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void fetchHealth();
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Riadom</CardTitle>
          <CardDescription>
            Vite + React with shared contracts and shadcn UI
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {loading && (
            <p className="shimmer text-sm text-muted-foreground">
              Loading health status&hellip;
            </p>
          )}
          {error && <p className="text-sm text-destructive">Error: {error}</p>}
          {health && (
            <div className="flex flex-col gap-1 text-sm">
              <p>
                <span className="font-medium">Status:</span> {health.status}
              </p>
              <p>
                <span className="font-medium">Timestamp:</span>{' '}
                {health.timestamp}
              </p>
            </div>
          )}

          <div className="overflow-hidden rounded-xl ring-1 ring-foreground/10">
            <div className="h-40 scroll-fade-y no-scrollbar overflow-y-auto">
              <div className="flex flex-col gap-1.5 p-1.5">
                {activityItems.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-lg bg-muted px-3 py-2.5 text-sm"
                  >
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Button onClick={() => void fetchHealth()} disabled={loading}>
            Refresh health
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
