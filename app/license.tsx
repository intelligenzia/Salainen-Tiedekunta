import { SEO } from '@/components/SEO';
import { Text } from '@/components/ui/text';
import { createBreadcrumbSchema, SITE_URL } from '@/lib/seo';
import { Stack } from 'expo-router';
import { ScrollView, View } from 'react-native';

export default function LicenseScreen() {
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Etusivu', url: SITE_URL },
    { name: 'Lisenssi', url: `${SITE_URL}/license` },
  ]);

  return (
    <>
      <SEO
        title="Lisenssi"
        description="Salainen Tiedekunta -sovelluksen MIT-lisenssi."
        path="/license"
        jsonLd={[breadcrumbSchema]}
      />
      <Stack.Screen options={{ title: 'Lisenssi' }} />
      <ScrollView className="flex-1 bg-paper" contentInsetAdjustmentBehavior="automatic">
        <View className="max-w-3xl mx-auto w-full p-4">
          
          <View className="mb-6 pb-4 border-b border-rule">
            <Text role="heading" aria-level="1" className="text-2xl font-bold text-ink tracking-tight">
              MIT-lisenssi
            </Text>
            <Text className="text-ink-muted text-sm mt-1">
              The MIT License (MIT)
            </Text>
          </View>

          
          <View className="bg-sunken rounded-lg p-4 mb-6">
            <Text className="text-ink-soft text-sm font-mono leading-relaxed">
              Copyright (c) {new Date().getFullYear()} Salainen Tiedekunta ry
            </Text>
          </View>

          <Text className="text-ink-soft text-sm leading-relaxed mb-4">
            Permission is hereby granted, free of charge, to any person obtaining
            a copy of this software and associated documentation files (the
            &quot;Software&quot;), to deal in the Software without restriction, including
            without limitation the rights to use, copy, modify, merge, publish,
            distribute, sublicense, and/or sell copies of the Software, and to
            permit persons to whom the Software is furnished to do so, subject to
            the following conditions:
          </Text>

          <Text className="text-ink-soft text-sm leading-relaxed mb-4">
            The above copyright notice and this permission notice shall be
            included in all copies or substantial portions of the Software.
          </Text>

          <View className="bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-6">
            <Text className="text-amber-800 dark:text-amber-200 text-sm leading-relaxed font-medium">
              THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
              EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
              MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
              NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
              BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
              ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
              CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
              SOFTWARE.
            </Text>
          </View>

          
          <View className="mt-8 mb-8">
            <Text className="text-lg font-semibold text-ink mb-3 tracking-tight">
              Suomeksi tiivistettynä
            </Text>
            <Text className="text-ink-soft text-sm leading-relaxed mb-3">
              MIT-lisenssi on avoin ohjelmistolisenssi, joka antaa käyttäjille
              laajat oikeudet käyttää, kopioida, muokata ja jakaa ohjelmistoa
              vapaasti, myös kaupallisiin tarkoituksiin.
            </Text>
            <Text className="text-ink-soft text-sm leading-relaxed mb-3">
              Ainoa vaatimus on, että alkuperäinen tekijänoikeusilmoitus ja
              lisenssiteksti säilytetään kaikissa kopioissa.
            </Text>
            <Text className="text-ink-soft text-sm leading-relaxed">
              Ohjelmisto toimitetaan &quot;sellaisenaan&quot; ilman takuita.
            </Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
