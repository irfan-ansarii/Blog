import React, { useState } from "react";
import { format } from "date-fns";
import { CalendarClock } from "lucide-react";
import Popup from "@/components/custom-ui/popup";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { FormField, FormItem } from "@/components/ui/form";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useOthers, useSelf } from "@/lib/liveblocks.config";

const StickyAction = ({ form }) => {
  const [openDate, setOpenDate] = useState(false);

  const users = [useSelf(), useOthers()].flatMap((u) => u);

  return (
    <Card className="sticky top-0  border p-4 col-span-3 z-10">
      <div className="flex items-center justify-end gap-4">
        <div className="-space-x-2 flex">
          {users.map(({ info }) => (
            <Avatar className="w-8 h-8 border-2">
              <AvatarImage src={info?.picture} />
              <AvatarFallback>{info?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
          ))}
        </div>
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
