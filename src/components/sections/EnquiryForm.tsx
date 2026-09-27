import { CircleCheck } from "lucide-react";
import { useId, useRef, useState, type FormEvent } from "react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { Button } from "@/components/ui/button";
import { Input, Label, Select, Textarea } from "@/components/ui/form";
import { enquiryForm } from "@/content/shared";
import { ranges } from "@/lib/models";
import { cn } from "@/lib/utils";
import { enquiryWhatsappUrl, type EnquiryValues } from "@/lib/whatsapp";

const empty: EnquiryValues = { name: "", organisation: "", enquiryFor: "", garment: "", quantity: "", city: "", details: "" };

/**
 * "Send your requirement". Nothing is sent to a server: submitting opens
 * WhatsApp in a new tab with the enquiry written out, one line per field.
 */
export function EnquiryForm({ className }: { className?: string }) {
  const id = useId();
  const f = enquiryForm.fields;
  const [values, setValues] = useState<EnquiryValues>(empty);
  const [error, setError] = useState(false);
  const [sentUrl, setSentUrl] = useState<string | null>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  const bind = (key: keyof EnquiryValues) => ({
    id: `${id}-${key}`,
    name: key,
    value: values[key],
    onChange: (e: { target: { value: string } }) => {
      setValues((v) => ({ ...v, [key]: e.target.value }));
      if (key === "name" && error && e.target.value.trim()) setError(false);
      setSentUrl(null);
    },
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!values.name.trim()) {
      setError(true);
      nameRef.current?.focus();
      return;
    }
    const url = enquiryWhatsappUrl(values);
    window.open(url, "_blank", "noopener,noreferrer");
    setSentUrl(url);
  };

  const errorId = `${id}-name-error`;

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      aria-labelledby={`${id}-title`}
      className={cn("rounded-card bg-surface p-6 text-body shadow-[0_30px_80px_-40px_rgba(0,0,0,0.5)] sm:p-8 lg:p-10", className)}
    >
      <h3 id={`${id}-title`} className="text-h3">
        {enquiryForm.title}
      </h3>
      <p className="mt-2 text-[15px] text-muted">{enquiryForm.intro}</p>

      <div className="mt-7 grid gap-x-4 gap-y-5 sm:grid-cols-2">
        <div>
          <Label htmlFor={`${id}-name`}>
            {f.name.label}
            <span className="text-red-fg" aria-hidden>
              *
            </span>
          </Label>
          <Input
            {...bind("name")}
            ref={nameRef}
            autoComplete="name"
            required
            aria-required="true"
            aria-invalid={error}
            aria-describedby={error ? errorId : undefined}
          />
          {error && (
            <p id={errorId} role="alert" className="mt-2 text-sm font-medium text-red-fg">
              {enquiryForm.nameError}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor={`${id}-organisation`}>{f.organisation.label}</Label>
          <Input {...bind("organisation")} autoComplete="organization" />
        </div>
        <div>
          <Label htmlFor={`${id}-enquiryFor`}>{f.enquiryFor.label}</Label>
          <Select {...bind("enquiryFor")}>
            <option value="">{enquiryForm.selectPlaceholder}</option>
            {f.enquiryFor.options.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <Label htmlFor={`${id}-garment`}>{f.garment.label}</Label>
          <Select {...bind("garment")}>
            <option value="">{enquiryForm.selectPlaceholder}</option>
            {ranges.map((r) => (
              <option key={r.slug} value={r.name}>
                {r.name}
              </option>
            ))}
            <option value={f.garment.notSure}>{f.garment.notSure}</option>
          </Select>
        </div>
        <div>
          <Label htmlFor={`${id}-quantity`}>{f.quantity.label}</Label>
          <Input {...bind("quantity")} placeholder={f.quantity.placeholder} inputMode="text" />
        </div>
        <div>
          <Label htmlFor={`${id}-city`}>{f.city.label}</Label>
          <Input {...bind("city")} autoComplete="address-level2" />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor={`${id}-details`}>{f.details.label}</Label>
          <Textarea {...bind("details")} placeholder={f.details.placeholder} rows={4} />
        </div>
      </div>

      <Button type="submit" variant="whatsapp" size="lg" className="mt-7 w-full">
        <WhatsAppIcon className="size-5" />
        {enquiryForm.submit}
      </Button>

      <div aria-live="polite">
        {sentUrl && (
          <p className="mt-4 flex gap-2.5 text-sm text-muted">
            <CircleCheck className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
            <span>
              {enquiryForm.sentNote}{" "}
              <a href={sentUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-accent underline underline-offset-4">
                {enquiryForm.sentFallback}
              </a>
            </span>
          </p>
        )}
      </div>
    </form>
  );
}
