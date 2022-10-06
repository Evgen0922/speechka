# Contribution guide
We're glad you're interested in contributing Misskey! In this document you will find the information you need to contribute to the project.

> **Note**
> This project uses Japanese as its major language, **but you do not need to translate and write the Issues/PRs in Japanese.**
> Also, you might receive comments on your Issue/PR in Japanese, but you do not need to reply to them in Japanese as well.\
> The accuracy of machine translation into Japanese is not high, so it will be easier for us to understand if you write it in the original language.
> It will also allow the reader to use the translation tool of their preference if necessary.

## Roadmap
See [ROADMAP.md](./ROADMAP.md)

## Issues
Before creating an issue, please check the following:
- To avoid duplication, please search for similar issues before creating a new issue.
- Do not use Issues to ask questions or troubleshooting.
	- Issues should only be used to feature requests, suggestions, and bug tracking.
	- Please ask questions or troubleshooting in the [Misskey Forum](https://forum.misskey.io/) or [Discord](https://discord.gg/Wp8gVStHW3).

> **Warning**
> Do not close issues that are about to be resolved. It should remain open until a commit that actually resolves it is merged.

## Before implementation
When you want to add a feature or fix a bug, **first have the design and policy reviewed in an Issue** (if it is not there, please make one). Without this step, there is a high possibility that the PR will not be merged even if it is implemented.

At this point, you also need to clarify the goals of the PR you will create, and make sure that the other members of the team are aware of them.
PRs that do not have a clear set of do's and don'ts tend to be bloated and difficult to review.

Also, when you start implementation, assign yourself to the Issue (if you cannot do it yourself, ask another member to assign you). By expressing your intention to work the Issue, you can prevent conflicts in the work.

## Well-known branches
- **`master`** branch is tracking the latest release and used for production purposes.
- **`develop`** branch is where we work for the next release.
	- When you create a PR, basically target it to this branch.
- **`l10n_develop`** branch is reserved for localization management.

## Creating a PR
Thank you for your PR! Before creating a PR, please check the following:
- If possible, prefix the title with a keyword that identifies the type of this PR, as shown below.
  - `fix` / `refactor` / `feat` / `enhance` / `perf` / `chore` etc
  - Also, make sure that the granularity of this PR is appropriate. Please do not include more than one type of change or interest in a single PR.
- If there is an Issue which will be resolved by this PR, please include a reference to the Issue in the text.
- Please add the summary of the changes to [`CHANGELOG.md`](/CHANGELOG.md). However, this is not necessary for changes that do not affect the users, such as refactoring.
- Check if there are any documents that need to be created or updated due to this change.
- If you have added a feature or fixed a bug, please add a test case if possible.
- Please make sure that tests and Lint are passed in advance.
  - You can run it with `npm run test` and `npm run lint`. [See more info](#testing)
- If this PR includes UI changes, please attach a screenshot in the text.

T