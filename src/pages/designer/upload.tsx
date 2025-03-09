import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AuthGuard from "@/components/auth/AuthGuard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Upload,
  Plus,
  Trash2,
  FileText,
  Image,
  AlertCircle,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const DesignerUploadPage = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [materials, setMaterials] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles([...files, ...newFiles]);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files);
      setImages([...images, ...newImages]);
    }
  };

  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleMaterialChange = (material: string, checked: boolean) => {
    if (checked) {
      setMaterials([...materials, material]);
    } else {
      setMaterials(materials.filter((m) => m !== material));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);

      // Reset form after success
      setTimeout(() => {
        setSuccess(false);
        setFiles([]);
        setImages([]);
        setTitle("");
        setDescription("");
        setPrice("");
        setCategory("");
        setMaterials([]);
      }, 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 border-b">
              <h1 className="text-2xl font-bold">Upload New Design</h1>
              <p className="text-muted-foreground mt-1">
                Share your 3D design with the marketplace
              </p>
            </div>

            {success && (
              <Alert className="m-6 bg-green-50 border-green-200">
                <AlertCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-600">
                  Your design has been successfully uploaded and is pending
                  review.
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="p-6 space-y-8">
              {/* Design Files */}
              <div className="space-y-4">
                <h2 className="text-lg font-medium">Design Files</h2>
                <p className="text-sm text-muted-foreground">
                  Upload your STL, OBJ, or other 3D model files
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                      <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                      <p className="text-sm text-center text-muted-foreground mb-2">
                        Drag and drop your 3D files here, or click to browse
                      </p>
                      <Input
                        type="file"
                        accept=".stl,.obj,.3mf,.gcode"
                        multiple
                        className="hidden"
                        id="file-upload"
                        onChange={handleFileChange}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                          document.getElementById("file-upload")?.click()
                        }
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Files
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Uploaded Files</h3>
                    {files.length === 0 ? (
                      <p className="text-sm text-muted-foreground">
                        No files uploaded yet
                      </p>
                    ) : (
                      <div className="space-y-2 max-h-[200px] overflow-y-auto">
                        {files.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between bg-gray-50 p-2 rounded"
                          >
                            <div className="flex items-center">
                              <FileText className="h-4 w-4 mr-2 text-blue-500" />
                              <span className="text-sm truncate max-w-[200px]">
                                {file.name}
                              </span>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => removeFile(index)}
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <Separator />

              {/* Product Images */}
              <div className="space-y-4">
                <h2 className="text-lg font-medium">Product Images</h2>
                <p className="text-sm text-muted-foreground">
                  Upload high-quality images of your design
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                      <Image className="h-10 w-10 text-muted-foreground mb-2" />
                      <p className="text-sm text-center text-muted-foreground mb-2">
                        Drag and drop images here, or click to browse
                      </p>
                      <Input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        id="image-upload"
                        onChange={handleImageChange}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                          document.getElementById("image-upload")?.click()
                        }
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Images
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">
                      Uploaded Images
                    </h3>
                    {images.length === 0 ? (
                      <p className="text-sm text-muted-foreground">
                        No images uploaded yet
                      </p>
                    ) : (
                      <div className="grid grid-cols-2 gap-2 max-h-[200px] overflow-y-auto">
                        {images.map((image, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={URL.createObjectURL(image)}
                              alt={`Preview ${index}`}
                              className="w-full h-24 object-cover rounded"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => removeImage(index)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <Separator />

              {/* Product Details */}
              <div className="space-y-4">
                <h2 className="text-lg font-medium">Product Details</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Product Title</Label>
                      <Input
                        id="title"
                        placeholder="e.g. Geometric Vase Design"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={category}
                        onValueChange={setCategory}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="home-decor">Home Decor</SelectItem>
                          <SelectItem value="gadgets">Gadgets</SelectItem>
                          <SelectItem value="jewelry">Jewelry</SelectItem>
                          <SelectItem value="toys">Toys</SelectItem>
                          <SelectItem value="figurines">Figurines</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="price">Price ($)</Label>
                      <Input
                        id="price"
                        type="number"
                        min="0.99"
                        step="0.01"
                        placeholder="29.99"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe your design, its features, and ideal use cases"
                        rows={5}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Compatible Materials</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { id: "pla", label: "PLA" },
                          { id: "abs", label: "ABS" },
                          { id: "petg", label: "PETG" },
                          { id: "resin", label: "Resin" },
                          { id: "nylon", label: "Nylon" },
                        ].map((material) => (
                          <div
                            key={material.id}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={`material-${material.id}`}
                              checked={materials.includes(material.id)}
                              onCheckedChange={(checked) =>
                                handleMaterialChange(
                                  material.id,
                                  checked === true,
                                )
                              }
                            />
                            <Label
                              htmlFor={`material-${material.id}`}
                              className="text-sm font-normal"
                            >
                              {material.label}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* License and Terms */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" required />
                  <Label htmlFor="terms" className="text-sm font-normal">
                    I confirm that I own the rights to this design and agree to
                    the{" "}
                    <a href="/terms" className="text-primary hover:underline">
                      Designer Terms of Service
                    </a>
                  </Label>
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin mr-2">⏳</span>
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Design
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const DesignerUploadWithAuth = () => {
  return (
    <AuthGuard requiredRole="designer">
      <DesignerUploadPage />
    </AuthGuard>
  );
};

export default DesignerUploadWithAuth;
