import { useDebounce } from "@/shared/lib/hooks/use-debounce";
import { Alert, Button, Input, Modal, Select, SelectOption, SpinnerLoader } from "@/shared/ui";
import { ErrorMessage } from "@/shared/ui/error-message";
import { ChangeEvent, useState } from "react";
import { organizationsApi } from "../api/organizations-api";

const OTHER_EMAIL_VALUE = "otherEmail" as const;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateEmail = (email: string): string | null => {
  if (!email) return "Email обязателен";
  if (!EMAIL_REGEX.test(email)) return "Введите корректный email адрес";
  return null;
};

const MESSAGES = {
  EMAIL_DESCRIPTION: "Выберите e-mail. На него мы пришлем письмо для активации аккаунта.",
  PHONE_DESCRIPTION:
    "Выберите номер телефона. По нему наш робот свяжется с вами для активации аккаунта.",
  CUSTOM_EMAIL_DESCRIPTION: "Введите e-mail. На него мы пришлем письмо для активации аккаунта.",
  CUSTOM_EMAIL_WARNING:
    "Так как email не найден в базе организации, потребуется дополнительная проверка владельца. Это может занять больше времени.",
} as const;

interface ICreateOrganizationModal {
  open: boolean;
  onClose: () => void;
}

export function CreateOrganizationModal({ open, onClose }: ICreateOrganizationModal) {
  const [inn, setInn] = useState<number | null>(null);
  const [customEmail, setCustomEmail] = useState<string>("");
  const [contactType, setContactType] = useState<"phone" | "email" | null>(null);
  const [selectValue, setSelectValue] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [selectOptions, setSelectOptions] = useState<SelectOption[] | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const searchOrganization = async (value: number) => {
    setIsSearching(true);
    setError(null);

    try {
      const result = await organizationsApi.findByInn(value);

      if (!result.data.suggestions || !result.data.suggestions[0]) {
        setError("Организации с таким ИНН не найдено");
        setSelectOptions(null);
        setContactType(null);
        setSelectValue("");
        return;
      }

      const { emails, phones } = result.data.suggestions[0].data;

      let options: SelectOption[] = [];

      if (emails && emails.length > 0) {
        options = emails.map((email) => ({ label: email, value: email }));
        setContactType("email");
      } else if (phones && phones.length > 0) {
        options = phones.map((phone) => ({ label: phone, value: phone }));
        setContactType("phone");
      } else {
        // Если нет ни emails ни phones - сразу показываем кастомный ввод
        setContactType("email");
        setSelectValue(OTHER_EMAIL_VALUE);
      }

      if (options.length > 0) {
        options.push({
          label: "Указать другой Email адрес (дольше проверка)",
          value: OTHER_EMAIL_VALUE,
        });
      }

      setSelectOptions(options);
    } catch {
      setError("Ошибка при поиске организации");
      setSelectOptions(null);
      setContactType(null);
    } finally {
      setIsSearching(false);
    }
  };

  const debounce = useDebounce(searchOrganization, 400);

  const handleChangeInn = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    setInn(value);

    if (!value) return;

    debounce(value);
  };

  const handleChangeCustomEmail = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setCustomEmail(value);

    const error = validateEmail(value);
    setEmailError(error);
  };

  const handleSelectChange = (value: string) => {
    setSelectValue(value);

    if (value !== OTHER_EMAIL_VALUE) {
      setCustomEmail("");
      setEmailError(null);
    }
  };

  const handleSubmitForm = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isCustomContact = showCustomEmailInput;
    const contactValue = isCustomContact ? customEmail : selectValue;

    console.log("submit", {
      inn,
      contactType,
      contactValue,
      isCustomContact, 
    });
    // потом допишем бэк 
    onClose()
  };

  const showCustomEmailInput = selectValue === OTHER_EMAIL_VALUE;

  // Валидация формы
  const isFormValid =
    !error &&
    !!inn &&
    !!selectValue &&
    (selectValue !== OTHER_EMAIL_VALUE || (!!customEmail && !emailError));

  return (
    <Modal open={open} onClose={onClose} title="Регистрация Вашей органиизации" showCloseButton>
      <form className="flex flex-col gap-3" onSubmit={handleSubmitForm}>
        <p>Для установления способа связи, введите ИНН организации которую хотите добавить.</p>
        <Input label="ИНН" value={inn || ""} onChange={handleChangeInn} placeholder="Введите ИНН" />
        {isSearching && (
          <div className="flex justify-center">
            <SpinnerLoader />
          </div>
        )}
        {showCustomEmailInput && !error && (
          <>
            <p>{MESSAGES.CUSTOM_EMAIL_DESCRIPTION}</p>
            <Alert message={MESSAGES.CUSTOM_EMAIL_WARNING} />
            <Input
              label="Email"
              type="email"
              value={customEmail}
              onChange={handleChangeCustomEmail}
              placeholder="Введите email"
              error={emailError || undefined}
            />
          </>
        )}
        {!showCustomEmailInput && selectOptions && contactType && (
          <>
            <p>
              {contactType === "email" ? MESSAGES.EMAIL_DESCRIPTION : MESSAGES.PHONE_DESCRIPTION}
            </p>
            <Select
              label={contactType === "email" ? "Email" : "Номер телефона"}
              onChange={handleSelectChange}
              value={selectValue}
              options={selectOptions}
            />
          </>
        )}
        {error && <ErrorMessage message={error} />}
        <div className="flex justify-end gap-3">
          <Button onClick={onClose} size="sm">
            Отменить
          </Button>
          <Button variant="secondary" size="sm" type="submit" disabled={!isFormValid}>
            Отправить
          </Button>
        </div>
      </form>
    </Modal>
  );
}
