"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../_components/table";
import { Switch } from "../../_components/ui/switch";
import CustomButton from "@/components/CustomButton";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../_components/dialog";
import { Input } from "../../_components/input";

const businessHours = [
  {
    day: "Monday",
    schedule: "9:00 AM - 5:00 PM",
  },
  {
    day: "Tuesday",
    schedule: "9:00 AM - 5:00 PM",
  },
  {
    day: "Wednesday",
    schedule: "9:00 AM - 5:00 PM",
  },
  {
    day: "Thursday",
    schedule: "9:00 AM - 5:00 PM",
  },
  {
    day: "Friday",
    schedule: "9:00 AM - 5:00 PM",
  },
  {
    day: "Saturday",
    schedule: "Closed",
  },
  {
    day: "Sunday",
    schedule: "Closed",
  },
];

export default function BusinessHoursSection() {
  const [checked, setChecked] = useState(false);
  return (
    <div className="w-full max-w-4xl shadow-md rounded-lg p-6 border border-ct-text-secondary space-y-4 animate-fadeIn">
      <h3 className="text-2xl font-bold">Business Hours</h3>
      <p className="text-sm">
        Business hours set your default availability for online booking, team
        members, and request forms.
      </p>
      <Table className="max-w-md">
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold">Day</TableHead>
            <TableHead className="font-semibold">Schedule</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {businessHours.map((item) => (
            <TableRow key={item.day}>
              <TableCell>{item.day}</TableCell>
              <TableCell>{item.schedule}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between max-w-md">
        <p>Edit work hours</p>
        <Dialog>
          <DialogTrigger asChild>
            <CustomButton title={"Edit"} />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Schedule</DialogTitle>
              <DialogDescription>
                Customize the schedule according to your needs.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Table className="max-w-md">
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold">Day</TableHead>
                    <TableHead className="font-semibold">Enabled</TableHead>
                    <TableHead className="font-semibold">Start Time</TableHead>
                    <TableHead className="font-semibold">End Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Monday</TableCell>
                    <TableCell>
                      <Switch />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="time"
                        className="h-8 placeholder:fill-ct-text-secondary dark:[color-scheme:dark]"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="time"
                        className="h-8 placeholder:fill-ct-text-secondary dark:[color-scheme:dark]"
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Tuesday</TableCell>
                    <TableCell>
                      <Switch />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="time"
                        className="h-8 placeholder:fill-ct-text-secondary dark:[color-scheme:dark]"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="time"
                        className="h-8 placeholder:fill-ct-text-secondary dark:[color-scheme:dark]"
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Wednesday</TableCell>
                    <TableCell>
                      <Switch />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="time"
                        className="h-8 placeholder:fill-ct-text-secondary dark:[color-scheme:dark]"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="time"
                        className="h-8 placeholder:fill-ct-text-secondary dark:[color-scheme:dark]"
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Thursday</TableCell>
                    <TableCell>
                      <Switch />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="time"
                        className="h-8 placeholder:fill-ct-text-secondary dark:[color-scheme:dark]"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="time"
                        className="h-8 placeholder:fill-ct-text-secondary dark:[color-scheme:dark]"
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Friday</TableCell>
                    <TableCell>
                      <Switch />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="time"
                        className="h-8 placeholder:fill-ct-text-secondary dark:[color-scheme:dark]"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="time"
                        className="h-8 placeholder:fill-ct-text-secondary dark:[color-scheme:dark]"
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Saturday</TableCell>
                    <TableCell>
                      <Switch />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="time"
                        className="h-8 placeholder:fill-ct-text-secondary dark:[color-scheme:dark]"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="time"
                        className="h-8 placeholder:fill-ct-text-secondary dark:[color-scheme:dark]"
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Sunday</TableCell>
                    <TableCell>
                      <Switch />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="time"
                        className="h-8 placeholder:fill-ct-text-secondary dark:[color-scheme:dark]"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="time"
                        className="h-8 placeholder:fill-ct-text-secondary dark:[color-scheme:dark]"
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex items-center justify-between max-w-md">
        <p>Display business hours on profile on client hub</p>
        <Switch checked={checked} onCheckedChange={setChecked} />
      </div>
    </div>
  );
}
