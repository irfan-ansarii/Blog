import React from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const Visibility = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Visibility</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <RadioGroup defaultValue="option-one" className="space-y-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-one" id="option-one" />
            <Label htmlFor="option-one">Visible</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-two" id="option-two" />
            <Label htmlFor="option-two">Hidden</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="protected" id="protected" />
            <Label htmlFor="protected">Protected</Label>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default Visibility;
