"use client";

import { Form, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { formObject, formSchema } from "./form/formSchema";
import { fieldType, formData } from "./form/formData";
import { Input } from "@/components/ui/input";

const Entry = () => {
  const form = useForm<z.infer<typeof formSchema>>(formObject);
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit((data) => console.log(data))}>
          {
            formData.map(
              (field) => (
                field.fieldType === fieldType.input
                  ? (
                    <FormField
                      key={field.name}
                      control={form.control}
                      name={field.name}
                      render={() => (
                        <FormItem>
                          <FormLabel>{field.name}</FormLabel>
                          <Input
                            type={field.type}
                            className={`${field.className} mt-40 `}
                            placeholder={field.placeholder}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />)
                  : field.fieldType === fieldType.textarea ? (
                    <FormField
                      key={field.name}
                      control={form.control}
                      name={field.name}
                      render={() => (
                        <FormItem>
                          <FormLabel>{field.name}</FormLabel>
                          <Input
                            type="textarea"
                            placeholder={field.placeholder}
                          />
                          <FormDescription>
                            {field.description}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ) : null
              )
            )
          }
        </form>
      </Form>
    </>
  )
};

export default Entry;

