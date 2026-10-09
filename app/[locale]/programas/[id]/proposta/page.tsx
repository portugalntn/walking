import { redirect } from "next/navigation";

/**
 * The design proposal was approved as the product page for every programme.
 * Old review links (/programas/<id>/proposta) land on the product page.
 */

type Props = { params: Promise<{ locale: string; id: string }> };

export default async function ProposalRedirect({ params }: Props) {
  const { locale, id } = await params;
  redirect(`/${locale}/programas/${id}`);
}
