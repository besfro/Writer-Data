<!--
 * @Name 
 * @Description 
 * @Author clc
 * @Date 2020-09-22 14:03:08
 * @LastEditTime 2020-09-22 14:03:40
 * @Email Lengchars@gmail.com
-->

git filter-branch --env-filter '

OLD_EMAIL="121074147@qq.com"
CORRECT_NAME="besfro"
CORRECT_EMAIL="lengchars@gmail.com"

if [ "$GIT_COMMITTER_EMAIL" = "$OLD_EMAIL" ]
then
export GIT_COMMITTER_NAME="$CORRECT_NAME"
export GIT_COMMITTER_EMAIL="$CORRECT_EMAIL"
fi
if [ "$GIT_AUTHOR_EMAIL" = "$OLD_EMAIL" ]
then
export GIT_AUTHOR_NAME="$CORRECT_NAME"
export GIT_AUTHOR_EMAIL="$CORRECT_EMAIL"
fi
' --tag-name-filter cat -- --branches --tags


git push origin --force --all