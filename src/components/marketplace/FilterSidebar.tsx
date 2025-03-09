import React, { useState, useEffect } from "react";
import { Slider } from "../ui/slider";
import { Checkbox } from "../ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Search, X } from "lucide-react";

interface FilterSidebarProps {
  onFilterChange?: (filters: FilterOptions) => void;
  className?: string;
}

interface FilterOptions {
  categories: string[];
  priceRange: [number, number];
  designers: string[];
  materials: string[];
}

const FilterSidebar = ({
  onFilterChange,
  className = "",
}: FilterSidebarProps) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedDesigners, setSelectedDesigners] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    { id: "figurines", label: "Figurines" },
    { id: "home-decor", label: "Home Decor" },
    { id: "gadgets", label: "Gadgets" },
    { id: "jewelry", label: "Jewelry" },
    { id: "toys", label: "Toys" },
  ];

  const designers = [
    { id: "alex-smith", label: "Alex Smith" },
    { id: "maria-jones", label: "Maria Jones" },
    { id: "david-chen", label: "David Chen" },
    { id: "sarah-patel", label: "Sarah Patel" },
    { id: "james-wilson", label: "James Wilson" },
  ];

  const materials = [
    { id: "pla", label: "PLA" },
    { id: "abs", label: "ABS" },
    { id: "petg", label: "PETG" },
    { id: "resin", label: "Resin" },
    { id: "nylon", label: "Nylon" },
  ];

  // We'll skip the automatic initialization and let the user apply filters manually
  // This prevents the filter reset issue

  const handleCategoryChange = (category: string, checked: boolean) => {
    setSelectedCategories((prev) => {
      const newCategories = checked
        ? [...prev, category]
        : prev.filter((c) => c !== category);
      return newCategories;
    });

    // Don't auto-apply filters here, let the user click Apply Filters button
  };

  const handleDesignerChange = (designer: string, checked: boolean) => {
    setSelectedDesigners((prev) => {
      const newDesigners = checked
        ? [...prev, designer]
        : prev.filter((d) => d !== designer);
      return newDesigners;
    });

    // Don't auto-apply filters here, let the user click Apply Filters button
  };

  const handleMaterialChange = (material: string, checked: boolean) => {
    setSelectedMaterials((prev) => {
      const newMaterials = checked
        ? [...prev, material]
        : prev.filter((m) => m !== material);
      return newMaterials;
    });

    // Don't auto-apply filters here, let the user click Apply Filters button
  };

  const handlePriceChange = (value: [number, number]) => {
    setPriceRange(value);

    // Don't auto-apply filters here, let the user click Apply Filters button
  };

  const handleClearFilters = () => {
    // Reset local state
    setSelectedCategories([]);
    setPriceRange([0, 1000]);
    setSelectedDesigners([]);
    setSelectedMaterials([]);

    // Update parent component with cleared filters
    onFilterChange?.({
      categories: [],
      priceRange: [0, 1000],
      designers: [],
      materials: [],
    });

    console.log("Filters cleared");
  };

  const handleApplyFilters = () => {
    // Make a copy of the current state to avoid reference issues
    const filterOptions = {
      categories: [...selectedCategories],
      priceRange: [...priceRange] as [number, number],
      designers: [...selectedDesigners],
      materials: [...selectedMaterials],
    };

    // Apply filters with the copied state
    onFilterChange?.(filterOptions);
  };

  const filteredCategories = categories.filter((category) =>
    category.label.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const filteredDesigners = designers.filter((designer) =>
    designer.label.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const filteredMaterials = materials.filter((material) =>
    material.label.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div
      className={`bg-white w-full max-w-[300px] h-full p-4 border-r ${className}`}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Filters</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClearFilters}
          className="text-xs flex items-center gap-1"
        >
          <X size={14} />
          Clear all
        </Button>
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search filters..."
          className="w-full pl-8 pr-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Accordion
        type="multiple"
        defaultValue={["categories", "price", "designers", "materials"]}
        className="space-y-2"
      >
        <AccordionItem value="categories" className="border-b-0">
          <AccordionTrigger className="py-2">Categories</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {filteredCategories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category.id}`}
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={(checked) =>
                      handleCategoryChange(category.id, checked === true)
                    }
                  />
                  <label
                    htmlFor={`category-${category.id}`}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {category.label}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price" className="border-b-0">
          <AccordionTrigger className="py-2">Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider
                defaultValue={[0, 1000]}
                value={priceRange}
                max={1000}
                step={10}
                onValueChange={(value) =>
                  handlePriceChange(value as [number, number])
                }
                className="mt-6"
              />
              <div className="flex items-center justify-between">
                <span className="text-sm">${priceRange[0]}</span>
                <span className="text-sm">${priceRange[1]}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="designers" className="border-b-0">
          <AccordionTrigger className="py-2">Designers</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {filteredDesigners.map((designer) => (
                <div key={designer.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`designer-${designer.id}`}
                    checked={selectedDesigners.includes(designer.id)}
                    onCheckedChange={(checked) =>
                      handleDesignerChange(designer.id, checked === true)
                    }
                  />
                  <label
                    htmlFor={`designer-${designer.id}`}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {designer.label}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="materials" className="border-b-0">
          <AccordionTrigger className="py-2">Materials</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {filteredMaterials.map((material) => (
                <div key={material.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`material-${material.id}`}
                    checked={selectedMaterials.includes(material.id)}
                    onCheckedChange={(checked) =>
                      handleMaterialChange(material.id, checked === true)
                    }
                  />
                  <label
                    htmlFor={`material-${material.id}`}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {material.label}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Separator className="my-4" />

      <div className="pt-2">
        <Button className="w-full" onClick={handleApplyFilters}>
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterSidebar;
