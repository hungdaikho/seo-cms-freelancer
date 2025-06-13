import React from 'react'

type Props = {}

const Logo = (props: Props) => {
  return (
    <>
      <div>Logo</div>
      <section className="bg-black py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-8 text-center">
            <h3 className="text-white text-3xl md:text-4xl font-bold leading-tight">
              Trusted by 150,000+ Content<br className="hidden md:block" />
              Creators, SEOs, Agencies, and Teams
            </h3>
          </div>
          <div className="overflow-hidden">
            <div
              className="flex items-center gap-12 whitespace-nowrap animate-marquee"
              style={{
                animation: 'marquee 30s linear infinite',
              }}
            >
              {[1, 2].map((repeat) => (
                <React.Fragment key={repeat}>
                  <img src="https://marketing-assets.surferseo.art/wf-cdn/62666115cfab453aacbd513c/65d70fb091140314a053ef8c_Bolt.svg" loading="lazy" alt="Bolt" className="h-10 w-auto opacity-40 grayscale contrast-50 brightness-200" />
                  <img src="https://marketing-assets.surferseo.art/wf-cdn/62666115cfab453aacbd513c/62666115cfab459081bd5c96_logo-clickup_color.svg" loading="lazy" alt="ClickUp" className="h-10 w-auto opacity-40 grayscale contrast-50 brightness-200" />
                  <img src="https://marketing-assets.surferseo.art/wf-cdn/62666115cfab453aacbd513c/62666115cfab451fd9bd5c57_FedEx.svg" loading="lazy" alt="FedEx" className="h-10 w-auto opacity-40 grayscale contrast-50 brightness-200" />
                  <img src="https://marketing-assets.surferseo.art/wf-cdn/62666115cfab453aacbd513c/630ccfae1763f197820a82fd_FreshBooks_logo_(2020)%201.svg" loading="lazy" alt="FreshBooks" className="h-10 w-auto opacity-40 grayscale contrast-50 brightness-200" />
                  <img src="https://marketing-assets.surferseo.art/wf-cdn/62666115cfab453aacbd513c/62666115cfab4572debd5c15_5e29b4159f25ef5df4549477_inpost-1.svg" loading="lazy" alt="InPost" className="h-10 w-auto opacity-40 grayscale contrast-50 brightness-200" />
                  <img src="https://marketing-assets.surferseo.art/wf-cdn/62666115cfab453aacbd513c/633313c35f7f59f582225c89_61e8374ce30b796f372e613b_Jasper%20Logo%20Light%201.svg" loading="lazy" alt="Jasper" className="h-10 w-auto opacity-40 grayscale contrast-50 brightness-200" />
                  <img src="https://marketing-assets.surferseo.art/wf-cdn/62666115cfab453aacbd513c/62666115cfab45423fbd5c14_Opera%20Logo.avif" loading="lazy" alt="Opera" className="h-10 w-auto opacity-40 grayscale contrast-50 brightness-200" />
                  <img src="https://marketing-assets.surferseo.art/wf-cdn/62666115cfab453aacbd513c/62666115cfab45b20cbd5c18_609a53792bca69702329e411_ramotion.svg" loading="lazy" alt="Ramotion" className="h-10 w-auto opacity-40 grayscale contrast-50 brightness-200" />
                  <img src="https://marketing-assets.surferseo.art/wf-cdn/62666115cfab453aacbd513c/62666115cfab45cd9abd5c50_Shopify.svg" loading="lazy" alt="Shopify" className="h-10 w-auto opacity-40 grayscale contrast-50 brightness-200" />
                  <img src="https://marketing-assets.surferseo.art/wf-cdn/62666115cfab453aacbd513c/62666115cfab4530a5bd5c4f_Square.svg" loading="lazy" alt="Square" className="h-10 w-auto opacity-40 grayscale contrast-50 brightness-200" />
                  <img src="https://marketing-assets.surferseo.art/wf-cdn/62666115cfab453aacbd513c/62666115cfab45f66abd5c10_5e2ede650341d66e74386f5f_ahlogo.png" loading="lazy" alt="Ahrefs" className="h-10 w-auto opacity-40 grayscale contrast-50 brightness-200" />
                  <img src="https://marketing-assets.surferseo.art/wf-cdn/62666115cfab453aacbd513c/62666115cfab45996bbd5c51_Intuti.svg" loading="lazy" alt="Intuti" className="h-10 w-auto opacity-40 grayscale contrast-50 brightness-200" />
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Logo