import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useForm, UseFormReturn } from "react-hook-form";
import { useState } from "react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Map from "@/sections/admin/Map";
export type DriverTypeDetailed = {
  createdAt: string;
  driverId: string;
  email: string;
  id: number;
  isCurrentlyBusy: boolean;
  location: string;
  name: string;
  phone: string;
  scheduledAssignments: any[];
  updatedAt: string;
};

type Props = {
  data: DriverTypeDetailed[];
  form: UseFormReturn<any>;
  label: string;
  id: string;
  required?: boolean;
  includeSearch?: boolean;
  onSelect: (driver: DriverTypeDetailed) => void;
  showMap?: boolean;
};

export default function DriverDropdown({
  form,
  label,
  required,
  id,
  data,
  includeSearch = true,
  onSelect,
  showMap,
}: Props) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = data.filter((driver) =>
    `${driver.name} ${driver.phone}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <FormField
        control={form.control}
        name={id}
        render={({ field }) => (
          <FormItem className="flex flex-col w-full mt-2">
            <FormLabel className="text-sm font-semibold">
              {label}
              {required && <strong>*</strong>}
            </FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    className={cn(
                      "w-full justify-between dark:bg-dark_comp",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value
                      ? data.find((item) => item.name === field.value)?.name
                      : `Select ${label}`}
                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-[460px] p-0 dark:bg-dark_main">
                <Command className="dark:bg-dark_main">
                  {includeSearch && (
                    <Input
                      placeholder={`Search by name or phone`}
                      className="h-9 dark:placeholder:text-[#aeaeae]"
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  )}
                  <CommandList className="dark:bg-dark_comp">
                    <CommandEmpty>No {label} found.</CommandEmpty>
                    <CommandGroup>
                      {filteredData.map((driver) => (
                        <CommandItem
                          value={driver.name}
                          key={driver.id}
                          onSelect={() => {
                            form.setValue(id, driver.name);
                            onSelect(driver); // Pass the whole driver object
                          }}
                          className="hover:dark:bg-base_dark"
                        >
                          {driver.name}
                          <CheckIcon
                            className={cn(
                              "ml-auto h-4 w-4",
                              driver.name === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            <FormMessage />
          </FormItem>
        )}
      />
      {showMap && (
        <>
          <Map />
        </>
      )}
    </>
  );
}
