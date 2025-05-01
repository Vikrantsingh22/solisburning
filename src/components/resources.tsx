import { useState, useEffect } from "react";
import { Search, Filter } from "lucide-react";
import data from "../../data/manual/resources/resources.json";
// Shadcn UI components
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data from your JSON - in a real app, you'd import this
// const resourcesData = {
//   resources: [
//     {
//       title: "Solana Smart Contract Security Best Practices",
//       description:
//         "Detailed documentation of common vulnerabilities and best practices for securing smart contracts on Solana, covering issues like integer overflows, improper signer checks, PDA misuse, and Anchor framework attacks.",
//       link: "https://github.com/slowmist/solana-smart-contract-security-best-practices",
//       category: "Documentation",
//       languages: ["English", "中文"],
//     },
//     {
//       title: "Solana Program Security: Best Practices to Prevent Exploits",
//       description:
//         "An in-depth blog post analyzing real vulnerabilities in Solana smart contracts, with a breakdown of insecure code and actionable best practices to prevent common exploits.",
//       link: "https://medium.com/@rkmonarch/solana-program-security-best-practices-to-prevent-exploits-f88b4a427bce",
//       category: "Blog",
//       languages: ["English"],
//     },
//     {
//       title: "How to Approach the Program Security Course",
//       description:
//         "A structured course designed to deepen your understanding of common security exploits in Solana smart contracts, based on Coral's Sealevel Attacks repository. Ideal for developers using both Anchor and native Rust.",
//       link: "https://solana.com/developers/courses/program-security/security-intro",
//       category: "Course",
//       languages: ["English"],
//     },
//     {
//       title: "Solana Smart Contracts: Common Pitfalls and How to Avoid Them",
//       description:
//         "Explains the critical importance of verifying that authorized accounts have signed a transaction, with examples in both Anchor and native Rust.",
//       link: "https://neodyme.io/en/blog/solana_common_pitfalls/#intro",
//       category: "Blog",
//       languages: ["English"],
//     },
//     {
//       title: "Owner Checks in Solana Smart Contracts",
//       description:
//         "Highlights the importance of verifying that accounts are owned by the expected program, with examples in both Anchor and native Rust to prevent spoofed or malicious account injections.",
//       link: "https://solana.com/developers/courses/program-security/owner-checks",
//       category: "Course",
//       languages: ["English"],
//     },
//     {
//       title: "Account Data Matching",
//       description:
//         "Explores how to securely validate and match on-chain account data to prevent mismatches, spoofing, or unauthorized access in Solana programs.",
//       link: "https://solana.com/developers/courses/program-security/account-data-matching",
//       category: "Course",
//       languages: ["English"],
//     },
//     {
//       title: "Reinitialization Attacks",
//       description:
//         "Explains how reinitializing already-initialized Solana accounts can introduce critical vulnerabilities and how to guard against them using Anchor and native Rust.",
//       link: "https://solana.com/developers/courses/program-security/reinitialization-attacks",
//       category: "Course",
//       languages: ["English"],
//     },
//     {
//       title: "Duplicate Mutable Accounts",
//       description:
//         "Understand vulnerabilities that can occur with instruction handlers that handle two mutable",
//       link: "https://solana.com/developers/courses/program-security/duplicate-mutable-accounts",
//       category: "Course",
//       languages: ["English"],
//     },
//     {
//       title: "Type Cosplay",
//       description:
//         "Understand the risks of using incorrect account types in instructions and how to mitigate them",
//       link: "https://solana.com/developers/courses/program-security/type-cosplay",
//       category: "Course",
//       languages: ["English"],
//     },
//     {
//       title: "Bump Seed Canonicalization",
//       description:
//         "Understand the need for consistent PDA calculation by storing and reusing the canonicalized bump seed in the account data.",
//       link: "https://solana.com/developers/courses/program-security/bump-seed-canonicalization",
//       category: "Course",
//       languages: ["English"],
//     },
//   ],
// };

export default function ResourcesComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [languageFilter, setLanguageFilter] = useState("All");
  const [filteredResources, setFilteredResources] = useState<
    {
      title: string;
      description: string;
      link: string;
      category: string;
      languages: string[];
    }[]
  >([]);

  // Extract unique categories and languages for filters
  const categories = [
    "All",
    ...Array.from(new Set(data.resources.map((resource) => resource.category))),
  ];
  const languages = [
    "All",
    ...Array.from(
      new Set(data.resources.flatMap((resource) => resource.languages))
    ),
  ];

  useEffect(() => {
    // Apply filters and search
    let filtered = data.resources;

    // Apply category filter if not "All"
    if (categoryFilter !== "All") {
      filtered = filtered.filter(
        (resource) => resource.category === categoryFilter
      );
    }

    // Apply language filter if not "All"
    if (languageFilter !== "All") {
      filtered = filtered.filter((resource) =>
        resource.languages.includes(languageFilter)
      );
    }

    // Apply search term if present
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (resource) =>
          resource.title.toLowerCase().includes(searchLower) ||
          resource.description.toLowerCase().includes(searchLower)
      );
    }

    setFilteredResources(filtered);
  }, [searchTerm, categoryFilter, languageFilter]);

  return (
    <div className="container mx-auto py-8 p-4">
      <h1 className="text-3xl font-bold mb-6">Solana Security Resources</h1>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex items-center gap-2">
          <Search className="w-5 h-5 text-gray-500" />
          <Input
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <Select value={languageFilter} onValueChange={setLanguageFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((language) => (
                  <SelectItem key={language} value={language}>
                    {language}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-gray-500 mb-4">
        Found {filteredResources.length} resource
        {filteredResources.length !== 1 ? "s" : ""}
      </p>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource, index) => (
          <Card key={index} className="h-full flex flex-col">
            <CardHeader>
              <CardTitle className="text-xl">{resource.title}</CardTitle>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant="outline">{resource.category}</Badge>
                {resource.languages.map((lang) => (
                  <Badge key={lang} variant="secondary">
                    {lang}
                  </Badge>
                ))}
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-gray-600">{resource.description}</p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <a
                  href={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Resource
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">
            No resources found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
}
