# Poompol (Paul) Buathong

Personal academic website: [poompol.github.io](https://poompol.github.io)

PhD candidate in Applied Mathematics at Cornell University. Research interests include Bayesian optimization, machine learning, and AI for science.

## Site structure

| Page | File |
|------|------|
| Home | `_pages/about.md` |
| Publications | `_pages/publications.md` |
| Talks | `_pages/talks.md` |
| CV | `_pages/cv.md` |

Site-wide settings live in `_config.yml`. Navigation is in `_data/navigation.yml`.

## Local preview

```bash
bundle install
bundle exec jekyll serve
```

Then open [http://localhost:4000](http://localhost:4000).

Docker alternative:

```bash
docker compose up
```

## Notes

Built with [Academic Pages](https://github.com/academicpages/academicpages.github.io) / Jekyll and GitHub Pages. Homepage and main sections use custom layouts rather than the template collection demos.
