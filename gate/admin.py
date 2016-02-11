from django.contrib import admin

from gate.models import Code, Open


class CodeAdmin(admin.ModelAdmin):
    list_display = ('code',)

admin.site.register(Code, CodeAdmin)


class OpenAdmin(admin.ModelAdmin):
    list_display = ('date',)

admin.site.register(Open, OpenAdmin)
