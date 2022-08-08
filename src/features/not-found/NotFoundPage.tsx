import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { DefaultLayout } from "../../layout/default.layout";

export default function NotFoundPage() {
  return <div>Página não encontrada. Verifique a URL.</div>;
}
