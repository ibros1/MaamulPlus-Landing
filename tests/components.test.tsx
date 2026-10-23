import { fireEvent, render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { ProductScreen } from '@/components/app-ui/product-screen';
import { screens } from '@/components/app-ui/screens';
import { Accordion } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Button } from '@/components/ui/button';
import { CompareTable } from '@/components/ui/compare-table';
import { FeatureCard } from '@/components/ui/feature-card';
import { Field, Input, SegmentedRadio } from '@/components/ui/field';
import { Footer } from '@/components/ui/footer';
import { Logo } from '@/components/ui/logo';
import { NavBar } from '@/components/ui/nav-bar';
import { PlanCard } from '@/components/ui/plan-card';
import { SectionHeader } from '@/components/ui/section-header';
import { StatTile } from '@/components/ui/stat-tile';
import { Steps } from '@/components/ui/steps';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { TourTabs } from '@/components/sections/tour-tabs';
import { comparison, editions } from '@/content/editions';
import { homeFaq } from '@/content/faq';
import { tour } from '@/content/home';
import { makeStore } from '@/store/store';

vi.mock('next/navigation', () => ({ usePathname: () => '/pricing', useRouter: () => ({ push: vi.fn() }) }));
const setTheme = vi.fn();
vi.mock('next-themes', () => ({ useTheme: () => ({ resolvedTheme: 'light', setTheme }) }));

function withStore(ui: ReactNode) {
  const store = makeStore();
  return { store, ...render(<Provider store={store}>{ui}</Provider>) };
}

describe('Button', () => {
  it('renders a link with an arrow and a CTA marker', () => {
    render(
      <Button href="/demo" arrow ctaLocation="hero">
        Book a demo
      </Button>,
    );
    const link = screen.getByRole('link', { name: 'Book a demo' });
    expect(link).toHaveAttribute('href', '/demo');
    expect(link).toHaveClass('mp-btn', 'mp-btn--primary');
    expect(link).toHaveAttribute('data-cta', 'hero');
    expect(link.querySelector('svg.mp-arrow')).not.toBeNull();
  });

  it('renders a native button with variants and sizes', () => {
    render(
      <Button variant="outline" size="lg" pill block>
        Go
      </Button>,
    );
    const btn = screen.getByRole('button', { name: 'Go' });
    expect(btn).toHaveAttribute('type', 'button');
    expect(btn).toHaveClass('mp-btn--outline', 'mp-btn--lg', 'mp-btn--pill', 'mp-btn--block');
  });
});

describe('small primitives', () => {
  it('Badge', () => {
    render(
      <Badge tone="green" dot>
        Posted
      </Badge>,
    );
    expect(screen.getByText('Posted')).toHaveClass('mp-badge--green', 'mp-badge--dot');
  });

  it('SectionHeader renders eyebrow, heading level and lead', () => {
    render(<SectionHeader eyebrow="Pricing" title="A plan sized to your business." lead="Lead." as="h1" id="t" />);
    expect(screen.getByRole('heading', { level: 1, name: 'A plan sized to your business.' })).toHaveAttribute('id', 't');
    expect(screen.getByText('Pricing')).toHaveClass('mp-eyebrow');
  });

  it('FeatureCard links its title', () => {
    render(<FeatureCard icon="book" title="Accounting" body="Body" href="/features/accounting" />);
    expect(screen.getByRole('link', { name: 'Accounting' })).toHaveAttribute('href', '/features/accounting');
  });

  it('StatTile shows the currency smaller and tones the value', () => {
    render(<StatTile label="Credit outstanding" value="1,284.36" tone="danger" />);
    expect(screen.getByText('1,284.36', { exact: false })).toHaveClass('mp-stat__value--danger');
  });

  it('Steps renders an ordered list', () => {
    render(<Steps items={[{ title: 'Book a demo', body: 'b' }, { title: 'Go live', body: 'b' }]} />);
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });

  it('Breadcrumbs mark the current page', () => {
    render(<Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'Pricing', path: '/pricing' }]} />);
    expect(screen.getByText('Pricing')).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument();
  });

  it('Logo references the sprite and is labelled when given a title', () => {
    const { container } = render(<Logo variant="full" title="MaamulPlus" />);
    expect(container.querySelector('use')).toHaveAttribute('href', '#mp-logo');
    expect(screen.getByRole('img', { name: 'MaamulPlus' })).toBeInTheDocument();
  });
});

describe('Field', () => {
  it('wires label, aria-invalid and the error message', () => {
    render(
      <Field id="f-name" label="Your name" error="Please add your name.">
        <Input id="f-name" invalid />
      </Field>,
    );
    const input = screen.getByLabelText('Your name');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby', 'f-name-error');
    expect(screen.getByRole('alert')).toHaveTextContent('Please add your name.');
  });

  it('SegmentedRadio renders a labelled radio group', () => {
    render(
      <SegmentedRadio
        name="edition"
        legend="Edition"
        options={[
          { value: 'enterprise', label: 'Enterprise' },
          { value: 'lite', label: 'Lite' },
        ]}
        inputProps={{ name: 'edition' }}
      />,
    );
    expect(screen.getByRole('group', { name: 'Edition' })).toBeInTheDocument();
    expect(screen.getAllByRole('radio')).toHaveLength(2);
  });
});

describe('Accordion', () => {
  it('uses native details with the first item open', () => {
    const { container } = render(<Accordion items={homeFaq} />);
    const details = container.querySelectorAll('details');
    expect(details).toHaveLength(homeFaq.length);
    expect(details[0]).toHaveAttribute('open');
    expect(details[1]).not.toHaveAttribute('open');
  });
});

describe('CompareTable', () => {
  it('has screen-reader text for every icon cell', () => {
    render(<CompareTable groups={comparison} caption="Comparison" />);
    expect(screen.getAllByText('Included').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Not included').length).toBeGreaterThan(0);
    expect(screen.getByRole('table', { name: 'Comparison' })).toBeInTheDocument();
  });
});

describe('PlanCard', () => {
  it('never shows a figure and preselects the edition', () => {
    const { store } = withStore(<PlanCard edition={editions.lite} ctaHref="#demo" />);
    expect(screen.getByText('Pricing on request')).toBeInTheDocument();
    expect(document.body.textContent).not.toMatch(/\$\s?\d/);
    fireEvent.click(screen.getByRole('link', { name: 'Request pricing' }));
    expect(store.getState().ui.preselectedEdition).toBe('lite');
  });

  it('featured variant uses the green CTA', () => {
    withStore(<PlanCard edition={editions.enterprise} featured ctaHref="#demo" />);
    expect(screen.getByRole('link', { name: 'Talk to sales' })).toHaveClass('mp-btn--green');
  });
});

describe('ThemeToggle', () => {
  it('switches theme', () => {
    render(<ThemeToggle label="Switch colour theme" />);
    fireEvent.click(screen.getByRole('button', { name: 'Switch colour theme' }));
    expect(setTheme).toHaveBeenCalledWith('dark');
  });
});

describe('NavBar', () => {
  it('marks the current page and toggles the mobile menu', () => {
    const { store } = withStore(<NavBar appUrls={{ enterprise: 'https://app.maamulplus.com', lite: 'https://lite.maamulplus.com' }} />);
    expect(screen.getAllByRole('link', { name: 'Pricing' })[0]).toHaveAttribute('aria-current', 'page');
    const signIn = screen.getByRole('button', { name: 'Sign in' });
    expect(signIn).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(signIn);
    expect(signIn).toHaveAttribute('aria-expanded', 'true');
    const lite = screen.getAllByRole('link', { name: /MaamulPlus Lite/ })[0];
    expect(lite).toHaveAttribute('href', 'https://lite.maamulplus.com');
    expect(lite).toHaveAttribute('rel', 'nofollow');
    fireEvent.keyDown(signIn, { key: 'Escape' });
    expect(signIn).toHaveAttribute('aria-expanded', 'false');
    const menu = screen.getByRole('button', { name: 'Open menu' });
    fireEvent.click(menu);
    expect(store.getState().ui.mobileNavOpen).toBe(true);
    expect(menu).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('link', { name: 'Sign in to Enterprise' })).toHaveAttribute('href', 'https://app.maamulplus.com');
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(store.getState().ui.mobileNavOpen).toBe(false);
  });
});

describe('Footer', () => {
  it('links every feature and the legal pages', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: 'Accounting' })).toHaveAttribute('href', '/features/accounting');
    expect(screen.getByRole('link', { name: 'Privacy policy' })).toHaveAttribute('href', '/legal/privacy');
    expect(screen.getAllByText(/Hargeisa, Somaliland/).length).toBeGreaterThan(0);
  });
});

describe('TourTabs', () => {
  it('follows the WAI-ARIA tabs pattern', () => {
    const { store } = withStore(
      <TourTabs tabs={tour.tabs} panels={tour.tabs.map((t) => <p key={t.id}>{t.title} panel</p>)} label="Product areas" />,
    );
    const tabs = screen.getAllByRole('tab');
    const tab = (i: number) => tabs[i] ?? document.body;
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
    expect(tabs[1]).toHaveAttribute('tabindex', '-1');
    // Inactive panels stay in the DOM, hidden.
    expect(screen.getByText('Customers & credit panel').closest('[role="tabpanel"]')).toHaveAttribute('hidden');
    fireEvent.keyDown(tab(0), { key: 'ArrowDown' });
    expect(store.getState().ui.activeTourTab).toBe('customer');
    fireEvent.keyDown(tab(1), { key: 'End' });
    expect(store.getState().ui.activeTourTab).toBe('people');
    fireEvent.keyDown(tab(4), { key: 'Home' });
    expect(store.getState().ui.activeTourTab).toBe('sales');
  });
});

describe('MacFrame + coded screens', () => {
  class RO {
    observe() {}
    disconnect() {}
  }
  beforeAll(() => {
    vi.stubGlobal('ResizeObserver', RO);
  });

  it.each(Object.keys(screens))('%s renders as an accessible image', (key) => {
    render(<ProductScreen screen={key as keyof typeof screens} label={`Screen ${key}`} />);
    const frame = screen.getByRole('img', { name: `Screen ${key}` });
    expect(frame).toHaveTextContent('app.maamulplus.com');
    expect(frame.querySelector('.ui-view')).toHaveAttribute('aria-hidden', 'true');
  });

  it('the dashboard shows the agreed figures', () => {
    render(<ProductScreen screen="dashboard" label="Dashboard" />);
    const text = screen.getByRole('img', { name: 'Dashboard' }).textContent ?? '';
    for (const v of ['1,284.50', '24,650.06', '1,284.36', '17,979.10', '7,436.03']) expect(text).toContain(v);
  });
});
