#!/usr/bin/env chicken-scheme
(use call-with-query
     http-client
     medea)

(call-with-dynamic-fastcgi-query
 (lambda (query)
   (let ((to (query-any query 'to))
         (subject (query-any query 'subject))
         (text (query-any query 'text))
         (from (query-any query 'from))
         (api-user (query-any query 'api_user))
         (api-key (query-any query 'api_key)))
     (handle-exceptions exn
       (display-status-&c. status-bad-request)
       (with-input-from-request
        "https://sendgrid.com/api/mail.send.json"
        `((to . ,to)
          (subject . ,subject)
          (text . ,text)
          (from . ,from)
          (api_user . ,api-user)
          (api_key . ,api-key))
        (lambda ()
          (display-content-type-&c. 'json)
          (write-json (read-json))))))))
