import React, { useState } from "react";
import { format } from "date-fns";
import { CalendarClock } from "lucide-react";
import Popup from "@/components/custom-ui/popup";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { FormField, FormItem } from "@/components/ui/form";

const StickyAction = ({ form }) => {
  const [openDate, setOpenDate] = useState(false);

  return (
    <Card className="sticky top-0  border p-4 col-span-3 z-10">
      <div className="flex items-center justify-end gap-4">
        <FormField
          control={form.control}
          name="published_at"
          render={({ field }) => (
            <FormItem>
              <Popup
                open={openDate}
                onOpenChange={setOpenDate}
                variant="popover"
                content={
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                }
              >
                <Button variant="outline">
                  <CalendarClock className="w-4 h-4 mr-2" />
                  {field.value
                    ? format(field.value, "dd MMM, yyyy")
                    : "Schedule"}
                </Button>
              </Popup>
            </FormItem>
          )}
        />

        <Button>Publish</Button>
      </div>
    </Card>
  );
};

export default StickyAction;
