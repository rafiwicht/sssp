FROM nginx

COPY dist/ /usr/share/nginx/html
COPY sssp.conf /etc/nginx/conf.d/sssp.conf

RUN rm /etc/nginx/conf.d/default.conf
