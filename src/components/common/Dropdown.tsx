"use client";

import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useForm, UseFormReturn } from "react-hook-form";

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
type Props = {
  data: any;
  form: any;
  label: string;
  id: string;
  required?: boolean;
  includeSearch?: boolean;
};
export default function Dropdown({
  form,
  label,
  required,
  id,
  data,
  includeSearch = true,
}: Props) {
  return (
    <FormField
      control={form.control}
      name={id}
      render={({ field }) => (
        <FormItem className="flex flex-col w-full">
          <FormLabel className="text-sm mt-2 font-semibold">
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
                    ? data.find((item: string) => item === field.value)
                    : `Select ${label}`}
                  <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[460px] p-0 dark:bg-dark_main">
              <Command className="dark:bg-dark_main">
                {includeSearch && (
                  <CommandInput
                    placeholder={`Search ${label}`}
                    className="h-9 dark:placeholder:text-[#aeaeae]"
                  />
                )}
                <CommandList className="dark:bg-dark_comp">
                  <CommandEmpty>No {label} found.</CommandEmpty>
                  <CommandGroup>
                    {data.map((item: string, index: number) => (
                      <CommandItem
                        value={item}
                        key={index}
                        onSelect={() => {
                          form.setValue(id, item);
                        }}
                        className="hover:dark:bg-base_dark"
                      >
                        {item}
                        <CheckIcon
                          className={cn(
                            "ml-auto h-4 w-4",
                            item === field.value ? "opacity-100" : "opacity-0"
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
  );
}
