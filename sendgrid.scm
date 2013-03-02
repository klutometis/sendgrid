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
         (api-user (or (query-any query 'api_user)
                       "klutometis"))
         (api-key (or (query-any query 'api_key)
                      "z_ZxnpX?qYKUW5")))
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
