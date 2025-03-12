import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertCircle,
  Loader2,
  Upload,
  X,
  Plus,
  Image as ImageIcon,
  File,
} from "lucide-react";
import {
  uploadDesignFile,
  uploadDesignImage,
  createDesign,
  DesignUploadData,
} from "@/api/designs";

const categories = [
  { value: "home-decor", label: "Home Decor" },
  { value: "gadgets", label: "Gadgets" },
  { value: "jewelry", label: "Jewelry" },
  { value: "toys", label: "Toys & Games" },
  { value: "figurines", label: "Figurines" },
  { value: "mechanical", label: "Mechanical Parts" },
  { value: "architecture", label: "Architectural Models" },
  { value: "art", label: "Art & Sculptures" },
  { value: "other", label: "Other" },
];

const materials = [
  { value: "pla", label: "PLA" },
  { value: "abs", label: "ABS" },
  { value: "petg", label: "PETG" },
  { value: "resin", label: "Resin" },
  { value: "nylon", label: "Nylon" },
  { value: "tpu", label: "TPU Flexible" },
];

const DesignUploadForm = () => {
  const [formData, setFormData] = useState<DesignUploadData>({
    title: "",
    description: "",
    category: "",
    price: 0,
    materials: [],
  });

  const [designFile, setDesignFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [additionalImageFiles, setAdditionalImageFiles] = useState<File[]>([]);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>("");
  const [additionalPreviews, setAdditionalPreviews] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };

  const handleMaterialChange = (material: string, checked: boolean) => {
    setFormData((prev) => {
      const updatedMaterials = checked
        ? [...prev.materials, material]
        : prev.materials.filter((m) => m !== material);
      return { ...prev, materials: updatedMaterials };
    });
  };

  const handleDesignFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setDesignFile(e.target.files[0]);
    }
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setThumbnailFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        setThumbnailPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdditionalImagesChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setAdditionalImageFiles((prev) => [...prev, ...newFiles]);

      // Create previews
      const newPreviews: string[] = [];
      newFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          newPreviews.push(reader.result as string);
          if (newPreviews.length === newFiles.length) {
            setAdditionalPreviews((prev) => [...prev, ...newPreviews]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeAdditionalImage = (index: number) => {
    setAdditionalImageFiles((prev) => {
      const newFiles = [...prev];
      newFiles.splice(index, 1);
      return newFiles;
    });

    setAdditionalPreviews((prev) => {
      const newPreviews = [...prev];
      newPreviews.splice(index, 1);
      return newPreviews;
    });
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      setError("Title is required");
      return false;
    }

    if (!formData.description.trim()) {
      setError("Description is required");
      return false;
    }

    if (!formData.category) {
      setError("Category is required");
      return false;
    }

    if (formData.price <= 0) {
      setError("Price must be greater than 0");
      return false;
    }

    if (formData.materials.length === 0) {
      setError("At least one material must be selected");
      return false;
    }

    if (!designFile) {
      setError("Design file is required");
      return false;
    }

    if (!thumbnailFile) {
      setError("Thumbnail image is required");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) return;

    setIsUploading(true);
    setUploadProgress(10);

    try {
      // Upload design file
      setUploadProgress(20);
      const designFileResult = await uploadDesignFile(designFile!);
      setUploadProgress(40);

      // Upload thumbnail
      const thumbnailResult = await uploadDesignImage(thumbnailFile!, true);
      setUploadProgress(60);

      // Upload additional images
      const additionalImageUrls: string[] = [];
      if (additionalImageFiles.length > 0) {
        for (const file of additionalImageFiles) {
          const result = await uploadDesignImage(file);
          additionalImageUrls.push(result.imageUrl);
        }
      }
      setUploadProgress(80);

      // Create design in database
      const designData: DesignUploadData = {
        ...formData,
        fileUrl: designFileResult.fileUrl,
        thumbnailUrl: thumbnailResult.imageUrl,
        additionalImages: additionalImageUrls,
      };

      const result = await createDesign(designData);
      setUploadProgress(100);

      if (result.success) {
        setSuccess(true);
        // Reset form
        setFormData({
          title: "",
          description: "",
          category: "",
          price: 0,
          materials: [],
        });
        setDesignFile(null);
        setThumbnailFile(null);
        setAdditionalImageFiles([]);
        setThumbnailPreview("");
        setAdditionalPreviews([]);
      }
    } catch (err: any) {
      console.error("Error uploading design:", err);
      setError(err.message || "Failed to upload design");
    } finally {
      setIsUploading(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="h-8 w-8 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">
            Design Uploaded Successfully!
          </h2>
          <p className="text-gray-600 mb-6">
            Your design has been uploaded and is now available in the
            marketplace.
          </p>
          <div className="flex justify-center space-x-4">
            <Button onClick={() => setSuccess(false)}>
              Upload Another Design
            </Button>
            <Button
              variant="outline"
              onClick={() => (window.location.href = "/designer/designs")}
            >
              View My Designs
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Upload New Design</h2>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Design Title*</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter a descriptive title"
                disabled={isUploading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description*</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your design, its features, and use cases"
                rows={5}
                disabled={isUploading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category*</Label>
              <Select
                value={formData.category}
                onValueChange={handleCategoryChange}
                disabled={isUploading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Base Price (TND)*</Label>
              <Input
                id="price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                value={formData.price || ""}
                onChange={handleInputChange}
                placeholder="Set your base price"
                disabled={isUploading}
              />
              <p className="text-xs text-muted-foreground">
                You will receive 70% of this price for each sale
              </p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Materials */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Available Materials*</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Select all materials that can be used to print your design
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {materials.map((material) => (
              <div key={material.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`material-${material.value}`}
                  checked={formData.materials.includes(material.value)}
                  onCheckedChange={(checked) =>
                    handleMaterialChange(material.value, checked as boolean)
                  }
                  disabled={isUploading}
                />
                <Label
                  htmlFor={`material-${material.value}`}
                  className="cursor-pointer"
                >
                  {material.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* File Uploads */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Design Files</h3>

          {/* Design File */}
          <div className="mb-6">
            <Label htmlFor="designFile" className="mb-2 block">
              3D Model File* (STL, OBJ, or 3MF)
            </Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              {designFile ? (
                <div className="flex items-center justify-center space-x-2">
                  <File className="h-8 w-8 text-blue-500" />
                  <div className="text-left">
                    <p className="font-medium">{designFile.name}</p>
                    <p className="text-sm text-gray-500">
                      {(designFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setDesignFile(null)}
                    disabled={isUploading}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              ) : (
                <div>
                  <Upload className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500 mb-2">
                    Drag and drop your 3D model file here, or click to browse
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      document.getElementById("designFile")?.click()
                    }
                    disabled={isUploading}
                  >
                    Select File
                  </Button>
                </div>
              )}
              <input
                id="designFile"
                type="file"
                accept=".stl,.obj,.3mf"
                className="hidden"
                onChange={handleDesignFileChange}
                disabled={isUploading}
              />
            </div>
          </div>

          {/* Thumbnail Image */}
          <div className="mb-6">
            <Label htmlFor="thumbnailImage" className="mb-2 block">
              Thumbnail Image* (JPG, PNG)
            </Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              {thumbnailPreview ? (
                <div className="flex flex-col items-center">
                  <div className="relative w-40 h-40 mb-2">
                    <img
                      src={thumbnailPreview}
                      alt="Thumbnail preview"
                      className="w-full h-full object-cover rounded-md"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                      onClick={() => {
                        setThumbnailFile(null);
                        setThumbnailPreview("");
                      }}
                      disabled={isUploading}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500">
                    {thumbnailFile?.name} (
                    {(thumbnailFile?.size / 1024 / 1024).toFixed(2)} MB)
                  </p>
                </div>
              ) : (
                <div>
                  <ImageIcon className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500 mb-2">
                    Upload a main image for your design
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      document.getElementById("thumbnailImage")?.click()
                    }
                    disabled={isUploading}
                  >
                    Select Image
                  </Button>
                </div>
              )}
              <input
                id="thumbnailImage"
                type="file"
                accept="image/jpeg,image/png"
                className="hidden"
                onChange={handleThumbnailChange}
                disabled={isUploading}
              />
            </div>
          </div>

          {/* Additional Images */}
          <div>
            <Label className="mb-2 block">Additional Images (Optional)</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
              {additionalPreviews.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
                  {additionalPreviews.map((preview, index) => (
                    <div key={index} className="relative">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-32 object-cover rounded-md"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                        onClick={() => removeAdditionalImage(index)}
                        disabled={isUploading}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              <div className="text-center">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="flex items-center"
                  onClick={() =>
                    document.getElementById("additionalImages")?.click()
                  }
                  disabled={isUploading || additionalPreviews.length >= 5}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add More Images
                </Button>
                <p className="text-xs text-gray-500 mt-2">
                  You can add up to 5 additional images
                </p>
              </div>

              <input
                id="additionalImages"
                type="file"
                accept="image/jpeg,image/png"
                multiple
                className="hidden"
                onChange={handleAdditionalImagesChange}
                disabled={isUploading || additionalPreviews.length >= 5}
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          {isUploading && (
            <div className="mb-4">
              <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-center mt-2 text-gray-600">
                Uploading... {uploadProgress}%
              </p>
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={isUploading}
            size="lg"
          >
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Uploading Design...
              </>
            ) : (
              "Upload Design"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default DesignUploadForm;
