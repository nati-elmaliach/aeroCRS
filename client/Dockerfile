FROM node

RUN npm install -g parcel axios

WORKDIR /home/app/

COPY . .

EXPOSE 1234

CMD ["npx" , "parcel" , "src/index.html"]