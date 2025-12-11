import { useAppDispatch, useAppSelector } from "@/shared/store/hooks";
import { useRouter, useSearchParams } from "next/navigation";

export function useAuthForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const handleSuccess = () => {
    const callbackUrl = searchParams.get("callbackUrl") || "/";
    router.push(callbackUrl);
  };

  return { dispatch, isLoading, error, handleSuccess };
}
