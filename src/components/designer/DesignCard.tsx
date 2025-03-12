import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Trash2, BarChart2 } from "lucide-react";

interface DesignCardProps {
  id: string;
  title: string;
  thumbnailUrl: string;
  price: number;
  status: string;
  category: string;
  salesCount: number;
  viewCount: number;
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

const DesignCard = ({
  id,
  title,
  thumbnailUrl,
  price,
  status,
  category,
  salesCount,
  viewCount,
  onView = () => (window.location.href = `/product/${id}`),
  onEdit = () => (window.location.href = `/designer/designs/edit/${id}`),
  onDelete = () => {},
}: DesignCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "draft":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative">
        <img
          src={thumbnailUrl}
          alt={title}
          className="w-full h-48 object-cover"
        />
        <Badge className={`absolute top-2 right-2 ${getStatusColor(status)}`}>
          {status}
        </Badge>
      </div>

      <CardContent className="p-4 flex-grow">
        <h3 className="font-semibold text-lg mb-1 line-clamp-1">{title}</h3>
        <div className="flex justify-between items-center mb-2">
          <span className="font-bold text-primary">{price.toFixed(2)} TND</span>
          <Badge variant="outline">{category}</Badge>
        </div>

        <div className="flex justify-between text-sm text-gray-500">
          <div className="flex items-center">
            <BarChart2 className="h-4 w-4 mr-1" />
            <span>{salesCount} sales</span>
          </div>
          <div className="flex items-center">
            <Eye className="h-4 w-4 mr-1" />
            <span>{viewCount} views</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex justify-between gap-2">
        <Button variant="outline" size="sm" onClick={onView}>
          <Eye className="h-4 w-4 mr-1" /> View
        </Button>
        <Button variant="outline" size="sm" onClick={onEdit}>
          <Edit className="h-4 w-4 mr-1" /> Edit
        </Button>
        <Button variant="outline" size="sm" onClick={onDelete}>
          <Trash2 className="h-4 w-4 mr-1" /> Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DesignCard;
