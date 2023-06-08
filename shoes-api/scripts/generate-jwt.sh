#!/bin/bash
set -e

key=jwt/private.key

while true; do
  echo "#############  JWT Keygen #############"

  if [ -f "$key" ]; then

    read -p " Keys already exists. Overwrite? [y/N] " yn
    # default value to no
    yn=${yn:-N}

    case $yn in
    [yY])
      break
      ;;
    [nN])
      clear
      echo "#############  Escape JWT Keygen #############"
      echo ""
      exit
      ;;
    *) ;;

    esac
  else
    break
  fi
done

# User agree to proceed
echo "#############  Keys generation in progress... #############"
rm -rf jwt
mkdir jwt
openssl genrsa -des3 -out jwt/private.key 2048
openssl rsa -in jwt/private.key -outform PEM -pubout -out jwt/public.key

clear
echo "#############  Keys generation done #############"
echo ""
