import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Designer {
  id: string;
  name: string;
  avatar?: string;
  specialty: string;
  rating: number;
}

interface TopDesignersProps {
  designers?: Designer[];
  limit?: number;
}

const TopDesigners = ({ designers = [], limit = 5 }: TopDesignersProps) => {
  // Default designers if none provided
  const defaultDesigners: Designer[] = [
    {
      id: "1",
      name: "Youssef Ben Ali",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Youssef",
      specialty: "Home Decor",
      rating: 4.8,
    },
    {
      id: "2",
      name: "Leila Mansour",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Leila",
      specialty: "Toys & Games",
      rating: 4.7,
    },
    {
      id: "3",
      name: "Karim Trabelsi",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Karim",
      specialty: "Gadgets",
      rating: 4.9,
    },
    {
      id: "4",
      name: "Amira Belhaj",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amira",
      specialty: "Jewelry",
      rating: 4.6,
    },
    {
      id: "5",
      name: "Mehdi Khelifi",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mehdi",
      specialty: "Figurines",
      rating: 4.5,
    },
  ];

  const displayDesigners = designers.length > 0 ? designers : defaultDesigners;
  const limitedDesigners = displayDesigners.slice(0, limit);

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Top Tunisian Designers</h3>
      <ul className="space-y-3">
        {limitedDesigners.map((designer) => (
          <li key={designer.id}>
            <a
              href={`/designers/${designer.id}`}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = `/designers/${designer.id}`;
              }}
            >
              <Avatar className="h-6 w-6">
                <AvatarImage src={designer.avatar} alt={designer.name} />
                <AvatarFallback>{designer.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="truncate">{designer.name}</p>
              </div>
              <div className="text-xs text-amber-400 flex items-center">
                <span>★</span>
                <span>{designer.rating.toFixed(1)}</span>
              </div>
            </a>
          </li>
        ))}
        <li>
          <a
            href="/designers"
            className="text-primary hover:text-primary-focus text-sm font-medium transition-colors"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = "/designers";
            }}
          >
            View all designers →
          </a>
        </li>
      </ul>
    </div>
  );
};

export default TopDesigners;
