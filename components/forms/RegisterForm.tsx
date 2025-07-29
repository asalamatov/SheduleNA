"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CostomFormField from "../CostomFormField";
import { Form, FormControl } from "@/components/ui/form";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { StudentFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { createUser, registerStudent } from "@/lib/actions/student.actions";
import StudentForm, { FormFieldType } from './StudentForm';
import { RadioGroup } from "../ui/radio-group";
import {
  AdmissionsOfficers,
  genderOptions,
  IdentificationTypes,
  StudentFormDefaultValues,
} from '@/constants';
import { RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { SelectItem } from "../ui/select";
import Image from "next/image";
import FileUploader from "../FileUploader";

const RegisterForm = ({ user }: { user: User }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof StudentFormValidation>>({
    resolver: zodResolver(StudentFormValidation),
    defaultValues: {
      ...StudentFormDefaultValues,
      name: '',
      email: '',
      phone: '',
    },
  });

  async function onSubmit(values: z.infer<typeof StudentFormValidation>) {
    setIsLoading(true);

    let formData;

    if (
      values?.identificationDocument &&
      values?.identificationDocument.length > 0
    ) {
      const blobFile = new Blob([values.identificationDocument[0]], {
        type: values.identificationDocument[0].type,
      });

      formData = new FormData();
      formData.append("blobFile", blobFile);
      formData.append("fileName", values.identificationDocument[0].name);
    }

    try {
      const studentData = {
        ...values,
        userId: user.$id,
        birthDate: new Date(values.birthDate),
        identificationDocument: formData,
      };

      // @ts-ignore
      const student = await registerStudent(studentData);

      if (student) {
        router.push(`/students/${user.$id}/new-appointment`);
      }
    } catch (error) {
      console.log("error: ", error);
    }

    setIsLoading(false);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 flex-1"
      >
        <section className="space-y-4">
          <h1 className="header">Welcome 👋, </h1>
          <p className="text-dark-700">
            Let us know more about yourself!
          </p>
        </section>

        {/* Personal Information */}
        <section className="space-y-6">
          <div className="mt-9 space-y-1">
            <h2 className="sub-header">Personal Information</h2>
          </div>
        </section>

        <CostomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="Full Name"
          placeholder="Enter your full name"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />

        <div className="flex gap-6 flex-col xl:flex-row">
          <CostomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="email"
            label="Email"
            placeholder="Enter your Email"
            iconSrc="/assets/icons/email.svg"
            iconAlt="email"
          />

          <CostomFormField
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name="phone"
            label="Phone Number"
            placeholder="123-456-7890"
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CostomFormField
            fieldType={FormFieldType.DATE_PICKER}
            control={form.control}
            name="birthDate"
            label="Date of birth"
            placeholder="mm/dd/yyyy"
            showTimeSelect={false}
            iconSrc="/assets/icons/email.svg"
            iconAlt="email"
          />

          <CostomFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="gender"
            label="Gender"
            renderSkeleton={(field) => (
              <FormControl>
                <RadioGroup
                  className="flex h-11 gap-6 xl:justify-between"
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  {genderOptions.map((option) => (
                    <div key={option} className="radio-group">
                      <RadioGroupItem value={option} id={option} />
                      <Label
                        className="cursor-pointer"
                        htmlFor={option}
                      >
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
            )}
          />
        </div>

        <div className="flex gap-6 flex-col xl:flex-row">
          <CostomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="address"
            label="Address"
            placeholder="Street, City, State, Zip"
          />

          <CostomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="occupation"
            label="Occupation"
            placeholder="Aerospace Engineer"
          />
        </div>

        <div className="flex gap-6 flex-col xl:flex-row">
          <CostomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="emergencyContactName"
            label="Emergency Contact Name"
            placeholder="Guardian's Name"
          />

          <CostomFormField
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name="emergencyContactNumber"
            label="Emergency Contact Number"
            placeholder="123-456-7890"
          />
        </div>

        {/* Medical Information */}
        <section className="space-y-6">
          <div className="mt-9 space-y-1">
            <h2 className="sub-header">Admission Information</h2>
          </div>
        </section>

        <CostomFormField
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name="primaryAdmissionsOfficer"
          label="Primary Admissions Officer"
          placeholder="Select Admissions Officer"
        >
          {AdmissionsOfficers?.map((admissionsOfficer) => (
            <SelectItem key={admissionsOfficer.name} value={admissionsOfficer.name}>
              <div className="flex  items-center gap-2 cursor-pointer">
                <Image
                  width={32}
                  height={32}
                  src={admissionsOfficer.image}
                  alt={admissionsOfficer.name}
                  className="rounded-full border border-dark-500"
                />
                <p>{admissionsOfficer.name}</p>
              </div>
            </SelectItem>
          ))}
        </CostomFormField>

        <div className="flex gap-6 flex-col xl:flex-row">
          <CostomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="insuranceProvider"
            label="Are you accepted to NAU?"
            placeholder="Yes/No"
          />

          <CostomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="insurancePolicyNumber"
            label="Are you a transfer student?"
            placeholder="Yes/No"
          />
        </div>

        <div className="flex gap-6 flex-col xl:flex-row">
          <CostomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="allergies"
            label="Are you applying to Undergraduate or Graduate program?"
            placeholder="Undergraduate/Graduate"
          />

          <CostomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="currentMedication"
            label="Are you a parent or a student?"
            placeholder="Parent/Student"
          />
        </div>

        <div className="flex gap-6 flex-col xl:flex-row">
          <CostomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="familyMedicalHistory"
            label="Did you schedule your F-1/J-1 Visa interview?"
            placeholder="Yes/No"
          />

          <CostomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="pastMedicalHistory"
            label="Are you in the U.S. on a valid visa?"
            placeholder="Yes/No"
          />
        </div>

        {/* Indentification and varification */}
        <section className="space-y-6">
          <div className="mt-9 space-y-1">
            <h2 className="sub-header">
              Identification & Varification
            </h2>
          </div>
        </section>

        <CostomFormField
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name="identificationType"
          label="Identification Type"
          placeholder="Select an Identification Type"
        >
          {IdentificationTypes?.map((type) => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </CostomFormField>

        <CostomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="identificationNumber"
          label="Identification Number"
          placeholder="123456789"
        />

        <CostomFormField
          fieldType={FormFieldType.SKELETON}
          control={form.control}
          name="identificationDocument"
          label="Scanner copy of Identification Document"
          renderSkeleton={(field) => (
            <FormControl>
              <FileUploader
                files={field.value}
                onChange={field.onChange}
              />
            </FormControl>
          )}
        />

        {/* Consent and privacy */}
        <section className="space-y-6">
          <div className="mt-9 space-y-1">
            <h2 className="sub-header">Consent and Privacy</h2>
          </div>
        </section>

        <CostomFormField
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="treatmentConsent"
          label="I agree to the treatment consent"
        />

        <CostomFormField
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="disclosureConsent"
          label="I agree to the disclosure of imformation"
        />

        <CostomFormField
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="privacyConsent"
          label="I agree to the privacy policy"
        />

        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterForm;
