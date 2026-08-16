"use client";

import { useState } from "react";

export function useBooking() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  return { isSubmitting, setIsSubmitting };
}
