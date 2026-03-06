"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { CommunityInputFormProps } from "@/types/communities.types";

const CommunityInputForm = ({
  isEditing,
  isPending,
  mutationFn,
  initialData,
}: CommunityInputFormProps) => {
  const router = useRouter();

  //react hook form
  const { handleSubmit, register } = useForm({
    values: {
      name: initialData?.name || "",
      description: initialData?.description || "",
    },
  });

  //submit handler
  const onSubmitHandler = async (formData: FieldValues) => {
    await mutationFn({
      name: formData.name,
      description: formData.description,
    });
    //redirect
    router.push(`/communities`);
  };

  return (
    <>
      <h2 className="text-lg mb-2">{`${isEditing ? "Update" : "Create"} Community`}</h2>
      <form onSubmit={handleSubmit(onSubmitHandler)} className="max-w-md">
        <fieldset
          name={`${isEditing ? "editCommunity" : "createCommunity"}`}
          disabled={isPending}
          className="flex flex-col gap-6 justify-center"
        >
          <div className="w-full">
            <Label className="mb-2 font-medium">Community Name</Label>
            <Input type="text" {...register("name")} />
          </div>
          <div>
            <Label className="mb-2 font-medium">Description</Label>
            <Textarea
              rows={4}
              className="resize-none"
              placeholder="What is your community about?"
              {...register("description")}
            />
          </div>
          <Button variant="default" type="submit">
            {isPending
              ? `${isEditing ? "Updating" : "Creating"} Community...`
              : `${isEditing ? "Update" : "Create"} Community`}
          </Button>
        </fieldset>
      </form>
    </>
  );
};

export default CommunityInputForm;
