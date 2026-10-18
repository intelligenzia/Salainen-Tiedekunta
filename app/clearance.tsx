import { SEO } from '@/components/SEO';
import { Action, Hero, Notice, Page, Prose, Section } from '@/components/kit';
import { grantClearance } from '@/lib/clearance';
import { PLEDGE } from '@/lib/content';
import { haptics } from '@/lib/haptics';
import { useRouter } from 'expo-router';

/** First-launch confidentiality pledge (native). The web shows the same text as an overlay. */
export default function ClearanceScreen() {
  const router = useRouter();

  const accept = async () => {
    haptics.success();
    await grantClearance();
    router.back();
  };

  return (
    <>
    <SEO title="Salassapitolupaus" description={PLEDGE.lede} path="/clearance" noIndex />
    <Page headerless>
      <Hero kicker="Pääsy rajoitettu · taso 0" title="Salassapitolupaus" lede={PLEDGE.lede} />
      <Section title="Sitoudun salaamaan">
        <Prose blocks={PLEDGE.items.map((text) => ({ kind: 'bullet' as const, text }))} />
      </Section>
      <Section footer={PLEDGE.footer}>
        <Action title="Annan salassapitolupauksen" onPress={accept} />
      </Section>
      <Notice text="Rikkomuksesta seuraa opiskelijavaihto." />
    </Page>
    </>
  );
}
