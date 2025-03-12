import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

const AdminAccount = () => {
  const [email, setEmail] = useState("admin@3dprintmarket.com");
  const [password, setPassword] = useState("Admin123!");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleCreateAdmin = async () => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Step 1: Create the auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: "Admin",
            last_name: "User",
            account_type: "admin",
          },
          // Also set in app_metadata to ensure it's preserved
          meta: {
            account_type: "admin",
          },
        },
      });

      if (authError) {
        throw authError;
      }

      if (!authData.user) {
        throw new Error("Failed to create admin user");
      }

      // Step 2: Create the user profile in the users table
      const { error: profileError } = await supabase.from("users").insert({
        id: authData.user.id,
        first_name: "Admin",
        last_name: "User",
        email: email,
        account_type: "admin",
      });

      if (profileError) {
        console.error("Profile creation error:", profileError);
        // Continue anyway since the auth user was created
      }

      setSuccess("Admin account created successfully!");
    } catch (err: any) {
      console.error("Error creating admin account:", err);
      setError(err?.message || "Failed to create admin account");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Create Admin Account</h2>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="mb-6 bg-green-50 border-green-200">
          <AlertDescription className="text-green-800">
            {success}
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <Button
          onClick={handleCreateAdmin}
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating...
            </>
          ) : (
            "Create Admin Account"
          )}
        </Button>
      </div>

      <div className="mt-4 text-sm text-gray-500">
        <p>Default credentials:</p>
        <p>Email: admin@3dprintmarket.com</p>
        <p>Password: Admin123!</p>
      </div>
    </div>
  );
};

export default AdminAccount;
