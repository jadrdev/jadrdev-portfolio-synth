export interface Testimonial {
  /** The client's own words, approved by them before publishing */
  quote: string;
  /** Person's name, or omit to show only the company */
  name?: string;
  company: string;
  /** Project title from projects.ts, shown as context */
  project?: string;
}

// Only real, client-approved quotes go here. The section stays hidden while it is empty.
export const testimonials: Testimonial[] = [];
