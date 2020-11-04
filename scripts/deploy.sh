set -e

git config user.name "profAlexGit"
git config user.email "glomer@bk.ru"

echo "Start to deploy..."

git checkout --orphan gh-pages
ls -l

git --work-tree ./dist add --all
git --work-tree ./dist commit -m "Deploy to GitHub Pages"
git push -f origin HEAD:gh-pages
rm -r dist

git checkout -f master
git branch -D gh-pages

echo "Successfully deployed"