import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import "./index.css";
import { NavLink } from "react-router";
import { useEffect, useState } from "react";

export function App() {
  const cards = [
    { title: "namas", description: "Quick summary of this item.", color: "bg-gray-300" },
    { title: "Nimbus", description: "Placeholder description text goes here.", color: "bg-gray-200" },
    { title: "Kaizen", description: "Short details about the card's content.", color: "bg-gray-300" },
    { title: "Solstice", description: "This is a demo description for the card.", color: "bg-gray-200" },
    { title: "Echo", description: "Sample metadata or short note.", color: "bg-gray-300" },
  ];

  const [theme, setTheme] = useState<string>(() => {
    try {
      const stored = localStorage.getItem("theme");
      if (stored) return stored;
      if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
    } catch {
      /* ignore */
    }
    return "light";
  });

  useEffect(() => {
    try {
      if (theme === "dark") document.documentElement.classList.add("dark");
      else document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="flex items-center justify-between p-4 border-b border-border">
        <div className="text-lg font-semibold">My App</div>
        <nav className="flex items-center gap-4">
          <NavLink to="/" className="hover:underline">Home</NavLink>
          <NavLink to="/Login" className="hover:underline">Login</NavLink>
          <NavLink to="/about" className="hover:underline">About</NavLink>
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="ml-2 inline-flex items-center gap-2 px-2 py-1 rounded-md border border-border bg-transparent hover:bg-muted"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
        </nav>
      </header>

      <main className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2">
          {cards.map((c, i) => (
            <Card key={i} className="w-full aspect-square">
              <div className="h-full flex flex-col">
                <CardContent className="p-2 flex-1 flex items-center justify-center">
                  <div className={`w-2/3 aspect-square rounded-md ${c.color}`} />
                </CardContent>

                <div className="p-3 border-t border-border">
                  <CardHeader className="p-0">
                    <CardTitle className="text-sm">{c.title}</CardTitle>
                    <CardDescription className="text-xs text-muted-foreground">{c.description}</CardDescription>
                  </CardHeader>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
