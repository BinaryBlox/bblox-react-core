# Contributing

If you're reading this, you're awesome! Thank you for helping us make this project great and being a part of the community

## Your first Pull Request

Working on your first Pull Request? You can learn how from this free video series:

[How to Contribute to an Open Source Project on GitHub](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github)

If you want to cotribute to one of our existing issues, check the [issues list](https://github.com/pautena/react-design-system/issues).

If you decide to fix an issue, please be sure to check the comment thread in case somebody is already working on a fix. If nobody is working on it at the moment, please leave a comment stating that you have started to work on it so other people don't accidentally duplicate your effort.

## Sending a Pull Request

Pull Requests are always welcome, but, before working on a large change, it is best to open an issue first to discuss it with the maintainers.

When in doubt, keep your Pull Requests small. To give a Pull Request the best chance of getting accepted, don't bundle more than one feature or bug fix per Pull Request. It's often best to create two smaller Pull Requests than one big one.

1. Fork the repository.

2. Clone the fork to your local machine and add upstream remote:

```sh
git clone https://github.com/<your username>/react-design-system.git
cd material-ui
git remote add upstream https://github.com/pautena/react-design-system.git
```

<!-- #default-branch-switch -->

3. Synchronize your local `main` branch with the upstream one:

```sh
git checkout main
git pull upstream main
```

4. Install the dependencies with yarn (npm isn't supported):

```sh
yarn install
```

5. Create a new topic branch:

```sh
git checkout -b my-topic-branch
```

6. Make changes, commit and push to your fork:

```sh
git push -u origin HEAD
```

7. Go to [the repository](https://github.com/pautena/react-design-system) and make a Pull Request.

The core team is monitoring for Pull Requests. We will review your Pull Request and either merge it, request changes to it, or close it with an explanation.

### Trying changes on the documentation site

The documentation site is built with MUI and contains examples of all the components.
This is a great place to experiment with your changes.
It's the local development environment used by the maintainers.

To get started:

```sh
yarn storybook
```

You can now access the documentation site [locally](http://localhost:6006).
Changes to the docs will hot reload the site.

### How to increase the chance of being accepted?

Continuous Integration (CI) runs a series of checks automatically when a Pull Request is opened. If you're not
sure if your changes will pass, you can always open a Pull Request and the GitHub UI will display a summary of
the results.

Make sure the following is true:

<!-- #default-branch-switch -->

- The branch is targeted at `main` for ongoing development. We do our best to keep `main` in good shape, with all tests passing. Code that lands in `main` must be compatible with the latest stable release. It may contain additional features, but no breaking changes. We should be able to release a new minor version from the tip of `main` at any time.
- If a feature is being added:
  - If this is a common use case, consider adding an example to the documentation.
- When adding new features or modifying existing ones, please include tests to confirm the new behavior.
- When submitting a new component, please add it to the documentation.
- The branch is not [behind its target branch](https://github.community/t/branch-10-commits-behind/2403).

Because we will only merge a Pull Request for which all tests pass. The following items need to be true:

- The code is formatted. If the code was changed, run `yarn format`.
- The code is linted. If the code was changed, run `yarn lint:eslint`.
- The code is type-safe. If TypeScript sources/declarations were changed, `yarn lint:ts` passed.
- The Pull Request title follows the pattern `[Component] Imperative commit message`. (See: [How to Write a Git Commit Message](https://chris.beams.io/posts/git-commit/) for a great explanation).

If your pull request addresses an open issue, make sure to link the PR to that issue.
Use any [supported GitHub keyword](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue#linking-a-pull-request-to-an-issue-using-a-keyword) in the PR description to automatically link them.
This makes it easier to understand where the PR is coming from and also speeds things up as the issue gets closed when the PR is merged.

### Updating the component API documentation

The documentation is auto-generated with [Storybook](https://storybook.js.org/) and published [here](https://pautena.com/react-design-system/).
Make sure that you add the proper stories to the component Storybook to generate the documentation.

### Coding style

Please follow the coding style of the project. MUI uses prettier and eslint, so if possible, enable linting in your editor to get real-time feedback.

- `yarn format` reformats the code.
- `yarn lint` runs manually the linting rules.

Finally, when you submit a Pull Request, they are run again by our continuous integration tools, but hopefully, your code is already clean!

## How to add a new demo in the documentation

## In a new component

Just create a new story file in the same folder than the component, named `new-component.stories.tsx`, and add some stories to help to undestand how the new component works and how has to be used.

## In an existing component

Just search for the file named `component-name.stories.tsx` and add new stories or edit the existing ones.

## License

By contributing your code to the [@pautena/react-design-system](https://github.com/pautena/react-design-system) GitHub repository, you agree to license your contribution under the [MIT license](/LICENSE).
