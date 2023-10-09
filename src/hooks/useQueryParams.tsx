import { useCallback, useRef } from "react";
import {
  useSearchParams,
  // URLSearchParamsInit,
  // ParamKeyValuePair,
} from "react-router-dom";

export function useQueryParams() {
  const [queryParams, setQueryParams] = useSearchParams({});
  const setQueryParamsRef = useRef(setQueryParams);
  setQueryParamsRef.current = setQueryParams;

  const refedSetQueryParams = useCallback(
    (...args: any) => {
      // console.log("useSearchParams", args);
      return setQueryParamsRef.current(...args);
    },

    // (...args: [Function, {replace: true}]) => setSearchParamsRef.current(...args),
    // (
    //   ...args: (
    //     | URLSearchParamsInit
    //     | (
    //         | ((prev: URLSearchParams) => URLSearchParamsInit)
    //         | Record<string, boolean>
    //       )
    //     | undefined
    //   )[]

    // Copilot generated this:

    // (...args: Parameters<typeof setSearchParamsRef.current>) => {
    //   const [params] = args;
    //   if (typeof params === "object" && !Array.isArray(params)) {
    //     const searchParams = new URLSearchParams();
    //     for (const [key, value] of Object.entries(params)) {
    //       if (value) {
    //         searchParams.append(key, String(value));
    //       }
    //     }
    //     setSearchParamsRef.current(searchParams);
    //   } else {
    //     setSearchParamsRef.current(...args);
    //   }
    // },

    []
  );
  return [queryParams, refedSetQueryParams] as const;
}

export function getQueryParams(searchParams: URLSearchParams) {
  const params = {} as Record<string, string>;
  searchParams.forEach((value, key) => {
    params[key] = value;
  });
  return params;
}
